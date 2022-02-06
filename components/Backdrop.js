
export default function Backdrop({ show = false, z = 50, onClick }) {


    return (
        <div
            style={{ zIndex: z }}
            onClick={(e) => onClick(e)}
            className="w-full absolute h-screen bg-black/40" 
        />
    )
}