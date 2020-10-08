export default function InputField ({ handleChange, reference, labelText, ...props }) {
  return (
    <div className='relative w-4/6 pt-6 pb-2'>
      <input
        id={labelText}
        ref={reference}
        className='w-full px-1 py-1 bg-white rounded-lg shadow outline-none move-label'
        onChange={handleChange}
        {...props}
      />
      <label
        htmlFor={labelText}
        className={`absolute left-0 pointer-events-none ${props.value.length ? 'top-0 py-0' : ''} ${!props.value.length ? 'p-1' : ''}`}
      >
        {labelText}
      </label>
    </div>
  )
}
