
import React from 'react'
import { List, DataTable, EditButton, DeleteButton  } from '@/components/admin'


export default function CategoryList() {
  return (
    <List title="Categorías">
        <DataTable>
            <DataTable.Col source="name" label="Nombre" />
            <DataTable.Col source="description" label="Descripción" />
            <DataTable.Col source="active" label="Activo" type="boolean" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
            <DataTable.Col>
                <DeleteButton />
            </DataTable.Col>
        </DataTable>
    </List>
  )
}
