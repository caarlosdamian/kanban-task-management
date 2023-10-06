import React, { useMemo } from 'react';
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
import { editTask } from '@/redux/boardSlice/boardSlice';

export const Taskboard = () => {
  const dispatch = useDispatch();

  const {
    modal: { type, selectedItem },
    boards,
  } = useSelector((state: RootState) => state);
  const defaultValues = useMemo(
    () => (type === 'addTask' ? {} : selectedItem),
    [selectedItem, type]
  );
  const { register, control, formState, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
    dispatch(setSelectedItem({}));
  };
  const handleSave = (form: any) => {
    dispatch(editTask(form));
    dispatch(editSelectedTask(form));
    dispatch(toggleModalType('viewTask'));
  };

  return (
    <Modal
      onOverlayClick={handleClosed}
      className="bg-primary min-w-[343px] md:min-w-[480px] min-h-[413px] z-50 top-40 p-8"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleSave)}>
        <h1 className="text-lg font-bold bg-primary">
          {type === 'editTask' ? 'Edit Task' : 'Add New Task'}
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
            label="+ Add New Column"
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
        <Button
          type="submit"
          label={type === 'addBoard' ? 'Create New Board' : 'Save Changes'}
          size={'sm'}
        />
      </form>
    </Modal>
  );
};
