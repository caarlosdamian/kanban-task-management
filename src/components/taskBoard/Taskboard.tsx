import React, { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Modal, TextField } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  editSelectedTask,
  setSelectedItem,
  toggleModalType,
} from '@/redux/modalSlice/ModalSlice';
import { ArrayInput } from '../arrayInput/ArrayInput';
import {
  addNewTask,
  editTask,
  toggleColum,
} from '@/redux/boardSlice/boardSlice';
import { Select } from '../select/Select';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { Board } from '@/types';

export const Taskboard = () => {
  const dispatch = useDispatch();

  const {
    modal: { type, selectedItem },
    boards,
  } = useSelector((state: RootState) => state);
  const isAddTask = useMemo(() => type === 'addTask', [type]);
  const defaultValues = useMemo(
    () => (isAddTask ? {} : selectedItem),
    [selectedItem, isAddTask]
  );
  const { register, control, formState, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });
  const statusColumns = useMemo(() => getActiveBoard(boards as Board[])[0].columns, [boards]);
  const colIndex = isAddTask
    ? 0
    : statusColumns.findIndex((item) => item.name === selectedItem.status);
  const initialstatus = useMemo(
    () =>
      isAddTask
        ? statusColumns[0]
        : statusColumns.filter((item) => item.name === selectedItem.status)[0],
    [isAddTask, statusColumns, selectedItem]
  );
  const [selectedColumn, setSelectedColumn] = useState(colIndex);
  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
    dispatch(setSelectedItem({}));
  };

  const handleSave = (form: any) => {
    const newValues = { ...form, status: statusColumns[selectedColumn].name };
    dispatch(toggleModalType(!isAddTask ? 'viewTask' : 'idle'));
    if (!isAddTask) {
      dispatch(
        toggleColum({
          colIndex: selectedColumn,
          prevColIndex: colIndex,
          taskIndex: selectedItem.taskIndex,
        })
      );
      dispatch(editTask(newValues));
      dispatch(editSelectedTask(newValues));
    } else {
      dispatch(addNewTask(newValues));
    }
  };

  return (
    <Modal
      onOverlayClick={handleClosed}
      className="bg-primary max-w-[343px] min-h-[413px] z-50 top-20 p-8 md:min-w-[480px]"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleSave)}>
        <h1 className="text-lg font-bold bg-primary">
          {!isAddTask ? 'Edit Task' : 'Add New Task'}
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="input-label">Title</h2>
          <TextField
            placeholder="Task name..."
            register={{ ...register('title') }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="input-label">Description</h2>
          <TextField
            area
            placeholder="Description..."
            register={{ ...register('description') }}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="input-label">Subtasks</h2>
            <div className="flex flex-col gap-3">
              {fields.map((input, index) => (
                <ArrayInput
                  key={input.id}
                  placeholder="Subtask..."
                  handleClosed={() => remove(index)}
                  // @ts-ignore
                  error={
                    formState?.errors.subtasks &&
                    // @ts-ignore
                    formState?.errors?.subtasks[index]?.name.message
                  }
                  register={{
                    ...register(`subtasks.${index}.title`, {
                      required: "Can't be empty",
                    }),
                  }}
                />
              ))}
            </div>
          </div>
          <Button
            label="+ Add New Subtask"
            size={'sm'}
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                title: '',
                isCompleted: false,
              })
            }
          />
        </div>
        <Select
          options={statusColumns}
          onChange={(e: any) => setSelectedColumn(e.index)}
          valueKey="name"
          initialValue={initialstatus}
        />
        <Button
          type="submit"
          label={isAddTask ? 'Create New Board' : 'Save Changes'}
          size={'sm'}
        />
      </form>
    </Modal>
  );
};
