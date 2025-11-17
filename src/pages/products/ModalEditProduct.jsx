import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ToggleSwitch, TextInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { editQuantity } from "../../services/productService";
import Swal from 'sweetalert2';

export function ModalEditProduct({ openModal, setOpenModal, module, data }) {
    let [quantity, setQuantity] = useState(0);
    let [formData, setFormData] = useState({
        "type": module,
        "id": data?.id,
        "name": data?.name,
        "displayQuantity": data?.quantity
    });

    const onCloseModal = () => {
        setQuantity(0);
        setOpenModal(false);
    }

    const onChangeQuantity = (e) => {
        const val = e.target.value;
        setQuantity(val);
        setFormData({...formData, displayQuantity: val})
    } 

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let toSumQuantity = 0;
            if (module === 'input') { 
                toSumQuantity = quantity; 
            } else if (module === 'output') { 
                toSumQuantity = quantity * -1; 
            } else {
                throw new Error("Tipo de módulo desconocido");
            }

            let response = await editQuantity({
                type: formData.type,
                id: formData.id,
                toSumQuantity: toSumQuantity // Cantidad que voy a sumar/restar
            });
            console.log('RESPONSE EDIT QUANTITY:', response);
            Swal.fire({
                title: "Hecho",
                text: "El producto se actualizó correctamente",
                icon: "success",
                allowOutsideClick: false,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log('ERR', error);
            
            let errorTxt = error.response.data;
            
            Swal.fire({
                title: error.response.data.message ?? 'Error',
                text: errorTxt.data ?? errorTxt.error,
                icon: "error",
            });
        }
    }

    useEffect(() => {
        setFormData({
            "type": module,
            "id": data?.id,
            "name": data?.name,
            "displayQuantity": data?.quantity
        });
        
    }, [data]);

    return (
        <>
        <Modal show={openModal} onClose={onCloseModal} size="md">
            <ModalHeader>Editar producto</ModalHeader>
            <form action="" onSubmit={onSubmit}>
                <ModalBody className="dark:bg-gray-800/60">
                        <input type="hidden" name="type" value={formData.type} />
                        <input type="hidden" name="id" value={formData.id} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-2 w-full">
                                <div className="mb-2 block">
                                    <Label htmlFor="name">Producto</Label>
                                </div>
                                <TextInput id="name" value={formData.name} disabled />
                            </div>
                            <div className="col-span-1 grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="quantity">Actual</Label>
                                    </div>
                                    <TextInput id="originalQuantity" type="number" value={data.quantity} disabled />
                                </div>
                                <div className="col-span-1">
                                    <div className="mb-2 block">
                                        <Label htmlFor="quantity">{module === 'input' ? 'Ingresar' : 'Retirar'}</Label>
                                    </div>
                                    <TextInput id="quantity" type="number" value={quantity} min={0}
                                        onChange={ (e) => onChangeQuantity(e) } />
                                </div>
                            </div>
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
