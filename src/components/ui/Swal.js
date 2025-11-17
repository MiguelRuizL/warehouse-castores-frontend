import Swal from "sweetalert2";

export function showSwal({
    title,
    text = '',
    icon = 'info',
    loading = false,
    showCancel = false,
    showConfirm = true,
    confirmText = 'Continuar',
    cancelText = 'Cancelar'
}) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: showCancel,
        showConfirmButton: showConfirm,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        willOpen: () => {
            if (loading) Swal.showLoading();
        },
        customClass: {
            popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
            title: 'text-2xl font-bold text-gray-900 dark:text-white',
            htmlContainer: 'text-gray-600 dark:text-gray-300',
            confirmButton: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
            cancelButton: 'py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        }
    });
}

export async function confirmModal({
    title,
    text = "Esta acción no se puede revertir.",
    onConfirm, // función de cuando le doy a aceptar
    successTitle = "¡Éxito!",
    successText = "La operación se completó.",
    reloadAfterSuccess = false,
}) {
    const result = await showSwal({
        title: title,
        text: text,
        icon: 'warning',
        showCancel: true,
        confirmText: 'Sí, confirmar'
    });
    if (result.isConfirmed) {
        showSwal({
            title: 'Procesando...',
            loading: true
        });
        try {
            let response = await onConfirm();
            console.log('RESPONSE', response);
            
            showSwal({
                title: successTitle,
                text: successText,
                icon: 'success'
            });
            if (reloadAfterSuccess) setTimeout(() => {window.location.reload()}, 1500);
        } catch (error) {
            console.log('ERROR SWAL CONFIRM', error);
            
            showSwal({
                title: 'Error',
                text: error.response?.data?.message || error.message || "Ocurrió un error.",
                icon: 'error'
            });
        }
    }
}