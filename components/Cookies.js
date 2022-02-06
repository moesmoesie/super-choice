import Backdrop from './Backdrop'

export default function Cookies() {
    return (
        <div className='h-screen w-full absolute'>
            <Backdrop z={200} show={true} />
            <div className='h-32 z-[200] w-full bg-black absolute bottom-0 grid place-items-center'>
                <button className='text-white border p-3'>Accept Cookies</button>
            </div>
        </div>
    )
}