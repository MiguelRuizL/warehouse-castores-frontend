import { 
    Table, TableBody, TableCell, TableHead, TableHeadCell, 
    TableRow, Breadcrumb, BreadcrumbItem, Select, Label
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogbook } from "../../services/logbookService";
import { formatOnlyDate, formatOnlyHour } from "../../utils/utilities";

export default function Logbook() {
    let navigate = useNavigate();
    const [logbooks, setLogbooks] = useState([]);

    const onChangeMType = async (e) => {
        try {
            const val = e.target.value;
            const logbooks = await getLogbook(val);
            setLogbooks(logbooks.data);
        } catch (error) {
            console.log('Ocurrió un error al cargar bitácora con filtros', error);
        }
    }

    useEffect(() => {
        const loadLogbooks = async () => {
            try {
                const logbooks = await getLogbook();
                setLogbooks(logbooks.data);
            } catch (error) {
                console.log('Ocurrió un error al cargar bitácora', error);
            }
        }

        loadLogbooks();
    }, []);

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
                    <BreadcrumbItem href="#">Bitácora</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="flex flex-col w-full sm:w-1/6 justify-start">
                <div className="mb-2 block">
                    <Label htmlFor="mtype">Filtrar por movimiento</Label>
                </div>
                <Select id="mtype" onChange={(e) => onChangeMType(e)}>
                    <option value={''}>Todos</option>
                    <option value={'input'}>Entrada</option>
                    <option value={'output'}>Salida</option>
                </Select>
            </div>
            <div className="flex flex-col items-center justify-center grow gap-2">
                <h1 className="dark:text-white font-bold">Bitácora de Movimientos</h1>
                <div className="overflow-x-auto w-full">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Fecha</TableHeadCell>
                                <TableHeadCell>Hora</TableHeadCell>
                                <TableHeadCell>Usuario</TableHeadCell>
                                <TableHeadCell>Tipo de Movimiento</TableHeadCell>
                                <TableHeadCell>Producto</TableHeadCell>
                                <TableHeadCell>Cantidad</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {logbooks.map(lg => (
                                <TableRow key={lg.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{formatOnlyDate(lg.doneAt)}</TableCell>
                                    <TableCell>{formatOnlyHour(lg.doneAt)}</TableCell>
                                    <TableCell>{lg.user.realUsername}</TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {lg.movementType == 'input' ? 'Entrada' : 'Salida'}
                                    </TableCell>
                                    <TableCell>{lg.product.name}</TableCell>
                                    <TableCell>{lg.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        </>
    );
}