export default function ExportButton() {
  return (
    <div className='flex gap-2 my-4'>
      <div>
        <button
          className='btn btn-accent gap-2'
          onClick={() => {
            const modal = document.getElementById('export_modal');
            if (modal) {
              (modal as HTMLDialogElement).showModal();
            }
          }}
        >
          Экспорт
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24'>
            <path fill='currentColor' d='M19 9h-4V3H9v6H5l7 7l7-7zM5 18v2h14v-2H5z' />
          </svg>
        </button>
      </div>
    </div>
  );
}