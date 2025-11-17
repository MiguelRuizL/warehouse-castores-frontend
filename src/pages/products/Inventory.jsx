import { 
    Table, TableBody, TableCell, TableHead, TableHeadCell, 
    TableRow, Breadcrumb, BreadcrumbItem, ToggleSwitch, Button
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalEditProduct } from "./ModalEditProduct";
import { ModalCreateProduct } from "./ModalCreateProduct";
import { getProducts, editProduct } from "../../services/productService";
import { confirmModal } from "../../components/ui/Swal";

export default function Inventory() {
    let navigate = useNavigate();
    const [openEdModal, setOpenEdModal] = useState(false);
    const [openCrModal, setOpenCrModal] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({});

    const onEdit = (product) => {
        setSelected(product);
        setOpenEdModal(true);
    }

    const toggleStatus = (product) => {
        confirmModal({
            title: product.status ? "¿Dar de baja?" : "¿Reactivar?",
            text: product.status ? 'Está por dar de baja al producto' : 'Está por reactivar al producto',
            icon: 'warning',
            onConfirm: async () => {
                await editProduct(product.id, {
                    "status": !product.status
                });
            },
            successTitle: "Actualizado",
            successText: "El producto fue " + (product.status ? 'dado de baja' : 'reactivado') + " correctamente",
            reloadAfterSuccess: true
        });
    }

    useEffect(() => {
        const loadProducts = async () => {
            try {
                let products = await getProducts();
                console.log('PRODUCTS', products.data);
                
                setData(products.data);
            } catch (error) {
                console.log('Error al obtener todos los productos:', error);
            }
        }

        loadProducts();
    }, [])

    return (
        <>
        <div className="flex flex-col gap-4 w-full h-full">
            <div>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <BreadcrumbItem href="#" onClick={() => navigate("/home")}>
                        <svg
                            width="25" height="25" className="me-2"
                            viewBox="0 0 24 24" fill="currentColor"
                            strokeWidth="1" strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                        Inicio
                    </BreadcrumbItem>
                    <BreadcrumbItem href="#">Inventario</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="flex justify-end">
                <Button className="py-1 px-2" onClick={(e) => {setOpenCrModal(true)}}>
                    <svg
                        width="23" height="23" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" className="me-1 font-bold"
                        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                    </svg>Nuevo
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center grow gap-2">
                <h1 className="dark:text-white font-bold">Inventario de Productos</h1>
                <div className="overflow-x-auto w-full">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Producto</TableHeadCell>
                                <TableHeadCell>Cantidad</TableHeadCell>
                                <TableHeadCell>Estado</TableHeadCell>
                                <TableHeadCell>Acciones</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {data.map(product => (
                                <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                        <ToggleSwitch 
                                            checked={product.status} 
                                            color="green"
                                            label={product.status ? 'Activo' : 'Inactivo'}
                                            onChange={() => toggleStatus(product)} 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => onEdit(product)}
                                            className="text-sm bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold p-1 rounded-lg focus:ring-amber-700 focus:outline-none focus:ring-2"
                                        >
                                            <svg
                                                width="28" height="28" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" className="text-gray-900 font-bold"
                                                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                <path d="M16 5l3 3" />
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        <ModalEditProduct openModal={openEdModal} setOpenModal={setOpenEdModal} module={'input'} data={selected}/>
        <ModalCreateProduct openModal={openCrModal} setOpenModal={setOpenCrModal}/>
        </>
    );
}