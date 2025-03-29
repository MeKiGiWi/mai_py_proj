export default function ExportModal() {
  return (
    <dialog id="export_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Экспорт расписания</h3>
        <div className="flex flex-col gap-3">
          <button className="btn btn-block text-info hover:bg-blue-50">
            Google Документы
          </button>
          <button className="btn btn-block text-success hover:bg-green-50">
            Google Календарь
          </button>
        </div>
      </div>
      
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
} 