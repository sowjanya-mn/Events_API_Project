export default function CreateEvent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="eventName"
            className="block text-gray-700 font-bold mb-2"
          >
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="eventDescription"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="eventDate"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventTime"
            className="block text-gray-700 font-bold mb-2"
          >
            Time
          </label>
          <input
            type="time"
            id="eventTime"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
