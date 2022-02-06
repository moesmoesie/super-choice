import { useRouter } from 'next/router'

export default function BackButton() {
    const router = useRouter()

    return (
        <div className="sticky pointer-events-none h-screen z-[300] -mt-[100vh] wrapper top-0 w-full">
            <button
                onClick={(e) => {
                    router.back()
                }}
                className="pr-5 hover:bg-primary5 transition-colors pl-3 py-1 bottom-0 mb-5 md:mb-8 pointer-events-auto drop-shadow-md right-4 bg-primary3 text-white rounded-md absolute">
                <div className='flex gap-x-2 items-center'>
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.0625 1L1 5.0625L5.0625 9.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 5.0625H7.5C11.9874 5.0625 15.625 8.70006 15.625 13.1875V14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p className='text-white'>Ga Terug</p>
                </div>
            </button>
        </div>
    )
}