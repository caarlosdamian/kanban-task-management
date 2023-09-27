import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Modal, TextField } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';

export const Taskboard = () => {
  const dispatch = useDispatch();
  const {
    modal: { type },
    boards,
  } = useSelector((state: RootState) => state);
  const { register, control, formState, handleSubmit } = useForm({
    defaultValues: {
      name:''
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'columns',
  // });

  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
  };
  const handleSave = (form: any) => {
    // type === 'addBoard'
    //   ? dispatch(addNewBoard(form))
    //   : dispatch(editBoard(form));
    // dispatch(toggleModalType('idle'));
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
            {/* {fields.map((input, index) => (
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
            ))} */}
          </div>
        </div>
        <Button
          label="+ Add New Column"
          size={'sm'}
          type="button"
          variant="secondary"
          // onClick={() =>
          //   append({
          //     name: '',
          //     tasks: [],
          //   })
          // }
        />
      </div>
      <Button
        type="submit"
        label={type === 'addBoard' ? 'Create New Board' : 'Save Changes'}
        size={'sm'}
      />
    </form>
  </Modal>
  )
}
