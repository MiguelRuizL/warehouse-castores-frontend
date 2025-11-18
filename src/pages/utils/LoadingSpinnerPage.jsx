import { Spinner } from "flowbite-react";

export default function LoadingSpinner() {
    return (
        <>
        <div className="flex flex-row min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-5">
            <div className="flex w-full items-center justify-center">
                <Spinner aria-label="Cargando..." />
            </div>
        </div>
        </>
    );
}