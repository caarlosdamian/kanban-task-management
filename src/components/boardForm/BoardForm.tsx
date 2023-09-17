'use client';
import React, { useMemo } from 'react';
import { Button, Modal, TextField } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { RootState } from '@/redux/store';
import { ArrayInput } from '../arrayInput/ArrayInput';
import { useFieldArray, useForm } from 'react-hook-form';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { addNewBoard, editBoard } from '@/redux/boardSlice/boardSlice';

export const BoardForm = () => {
  const dispatch = useDispatch();
  const {
    modal: { type },
    boards,
  } = useSelector((state: RootState) => state);
  const [activeBoard] = useMemo(
    () =>
      type === 'addBoard'
        ? [
            {
              name: '',
              columns: [],
            },
          ]
        : getActiveBoard(boards),
    [type, boards]
  );
  const { register, control, watch, formState, handleSubmit } = useForm({
    defaultValues: activeBoard,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });
  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
  };
  const handleSave = (form: any) => {
    console.log('Entrando');
    type === 'addBoard'
      ? dispatch(addNewBoard(form))
      : dispatch(editBoard(form));
    dispatch(toggleModalType('idle'));
  };
  return (
    <Modal
      onOverlayClick={handleClosed}
      className="bg-primary min-w-[480px] min-h-[413px] z-50 top-40 p-8"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleSave)}>
        <h1 className="text-lg font-bold bg-primary">
          {type === 'addBoard' ? 'Add New Board' : 'Edit Board'}
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="input-label">Board Name</h2>
          <TextField
            placeholder="Board name..."
            register={{ ...register('name') }}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="input-label">Board Columns</h2>
            <div className="flex flex-col gap-3">
              {fields.map((input, index) => (
                <ArrayInput
                  key={input.id}
                  placeholder="Board Column..."
                  handleClosed={() => remove(index)}
                  // @ts-ignore
                  error={
                    formState?.errors.columns &&
                      // @ts-ignore
                    formState?.errors?.columns[index]?.name.message
                  }
                  register={{
                    ...register(`columns.${index}.name`, {
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
                name: '',
                tasks: [],
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
