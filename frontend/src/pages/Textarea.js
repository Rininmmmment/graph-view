export default function Textarea({ name, value, onChange }) {
    return (
        <div>
            <textarea
                name={name}
                rows="10"
                cols="50"
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    )
}
