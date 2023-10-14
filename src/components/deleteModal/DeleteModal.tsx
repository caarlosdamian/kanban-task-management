import React from 'react';
import { Button, Modal } from '..';

interface Props {
  title: string;
  description: string;
  handleSuccess: () => void;
  handleCancel: () => void;
}

export const DeleteModal = ({
  description,
  handleCancel,
  handleSuccess,
  title,
}: Props) => {
  return (
    <Modal className="bg-primary max-w-[343px] md:max-w-[480px] min-h-[284px] z-50 top-20 p-6 md:min-h-[226px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-error text-base font-bold md:text-lg">{title}</h2>
          <h3 className="text-mediumGray text-13px leading-6 font-medium">
            {description}
          </h3>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            label="Delete"
            onClick={handleSuccess}
            variant="destructive"
            size="sm"
          />
          <Button
            label="Cancel"
            onClick={handleCancel}
            variant="secondary"
            size="sm"
          />
        </div>
      </div>
    </Modal>
  );
};
