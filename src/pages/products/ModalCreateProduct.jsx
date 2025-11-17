import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ToggleSwitch, TextInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { createProduct } from "../../services/productService";
import Swal from 'sweetalert2';

export function ModalCreateProduct({ openModal, setOpenModal }) {
    let [formData, setFormData] = useState({
        "name": ''
    });

    const onCloseModal = () => {
        setFormData({
            "name": ''
        })
        setOpenModal(false);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            let response = await createProduct(formData);
            console.log('RESPONSE CREATE PRODUCT:', response);
            Swal.fire({
                title: "Hecho",
                text: "El producto se creó correctamente",
                icon: "success",
                allowOutsideClick: false,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            let errorTxt = error.response.data;
            
            Swal.fire({
                title: error.response.data.message ?? 'Error',
                text: errorTxt.data ?? errorTxt.error,
                icon: "error",
            });
        }
    }

    return (
        <>
        <Modal show={openModal} onClose={onCloseModal} size="md">
            <ModalHeader>Crear producto</ModalHeader>
            <form action="" onSubmit={onSubmit}>
                <ModalBody className="dark:bg-gray-800/60">
                            <div className="flex flex-col w-full">
                                <div className="mb-2 block">
                                    <Label htmlFor="name">Nombre</Label>
                                </div>
                                <TextInput id="name" value={formData.name} 
                                    onChange={(e) => {setFormData({ ...formData, name: e.target.value })}} />
                            </div>
                </ModalBody>
                <ModalFooter className="flex justify-end">
                    <Button color="alternative" onClick={onCloseModal}>Cancelar</Button>
                    <Button type="submit">Crear</Button>
                </ModalFooter>
            </form>
        </Modal>
        </>
    );
}