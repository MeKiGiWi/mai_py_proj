import { forwardRef } from 'react';

type ExportModalProps = {
  onExport: (format: 'docs' | 'calendar') => void;
};

const ExportModal = forwardRef<HTMLDialogElement, ExportModalProps>(
  ({ onExport }, ref) => {
    return (
      <dialog ref={ref} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Экспорт расписания</h3>
          <div className='flex flex-col gap-3'>
            <button 
              className='btn btn-block text-info hover:bg-blue-50'
              onClick={() => onExport('docs')}
            >
              Google Документы
            </button>
            <button 
              className='btn btn-block text-success hover:bg-green-50'
              onClick={() => onExport('calendar')}
            >
              Google Календарь
            </button>
          </div>
        </div>

        <form method='dialog' className='modal-backdrop'>
          <button>Закрыть</button>
        </form>
      </dialog>
    );
  }
);

ExportModal.displayName = 'ExportModal';

export default ExportModal;