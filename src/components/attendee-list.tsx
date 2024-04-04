import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { IconButton } from './icon-button'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { Table } from './table/table'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList(){
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){

        setSearch(event.target.value)
    }

    function goToNextPage(){
        setPage(page + 1)
    }

    function goToPreviousPage(){
        setPage(page - 1)
    }

    function goToFirstPage(){
        setPage(1)
    }

    function goToLastPage(){
        setPage(totalPages)
    }

    return (
        <div className='flex flex-col gap-4'>
             <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">Participantes</h1>
            <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3" >
                <Search className='size-4 text-emerald-300'/>
                <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0" placeholder="Buscar participante..." />
            </div>

            {search}
            </div>

            <Table>
                <thead>
                    <tr className='border-b border-white/10'>
                         <TableHeader style={{  width: 48 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:text-orange-400" />
                        </TableHeader>
                         <TableHeader >Códigos</TableHeader>
                         <TableHeader>Participantes</TableHeader>
                         <TableHeader>Data de incrição</TableHeader>
                         <TableHeader>Data do check-in</TableHeader>
                         <TableHeader style={{  width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return (
                            <TableRow key={attendee.id} >
                        <TableCell>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:text-orange-400" />
                        </TableCell>
                        <TableCell>{attendee.id}</TableCell>
                        <TableCell>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold text-white'>{attendee.name}</span>
                                <span>{attendee.email}</span>
                            </div>
                        </TableCell>
                        <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                        <TableCell>{dayjs().to(attendee.checkInAt)}</TableCell>
                        <TableCell>
                            <IconButton transparent>
                                <MoreHorizontal className='size-4 '></MoreHorizontal>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell className='text-right' colSpan={3}>  
                        <div className='inline-flex items-center gap-8'>
                            <span>Página {page} de {totalPages}</span>
                            <div className='flex gap-1.5'>
                            <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                <ChevronsLeft className='size-4 '></ChevronsLeft>
                            </IconButton>
                            <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                <ChevronLeft className='size-4 '></ChevronLeft>
                            </IconButton>
                            <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                <ChevronRight className='size-4 '></ChevronRight>
                            </IconButton>
                            <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                <ChevronsRight className='size-4 '></ChevronsRight>
                            </IconButton>
                           
                            </div>
                        </div>   
                        </TableCell>
                    </tr>
                </tfoot>
                </Table>
        </div>
    )
}