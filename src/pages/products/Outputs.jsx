import { 
    Table, TableBody, TableCell, TableHead, TableHeadCell, 
    TableRow, Breadcrumb, BreadcrumbItem, ToggleSwitch, Button
} from "flowbite-react";
import { use, useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { ModalEditProduct } from "./ModalEditProduct";

export default function Output() {
    let navigate = useNavigate();
    const [openEdModal, setOpenEdModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState({});

    const onEdit = (product) => {
        setSelected(product);
        setOpenEdModal(true);
    }

    // Solo recupero los productos activos
    useEffect(() => {
        const loadActiveProducts = async () => {
            try {
                let active = await getProducts(1);
                setProducts(active.data);
            } catch (error) {
                console.log('Error al obtener productos activos', error);                
            }
        } 
        loadActiveProducts();
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
                    <BreadcrumbItem href="#">Salidas</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="flex flex-col items-center justify-center grow gap-2">
                <h1 className="dark:text-white font-bold">Salidas de Productos</h1>
                <div className="overflow-x-auto w-full">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Producto</TableHeadCell>
                                <TableHeadCell>Cantidad</TableHeadCell>
                                <TableHeadCell>Sacar</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {products.map(product => (
                                <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell> {/* Botón salidas */}
                                        <button onClick={() => onEdit(product)}
                                            className="text-sm bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold p-1 rounded-lg focus:ring-amber-700 focus:outline-none focus:ring-2"
                                        >
                                            <svg
                                                width="32" height="32" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" className="text-gray-900"
                                                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z" />
                                                <path d="M3 9v6" />
                                                <path d="M6 9v6" />
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
        <ModalEditProduct openModal={openEdModal} setOpenModal={setOpenEdModal} module={'output'} data={selected}/>
        </>
    );
}