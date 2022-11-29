import { h } from "preact"

function Toast({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="bg-red-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-b-lg block mb-3"
        id="static-example"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-mdb-autohide="false"
      >
        <div className="p-3 break-words text-white">{message}</div>
      </div>
    </div>
  )
}

export default Toast
