export const mockKpis = [
  {
    label: 'Ventas ingresadas',
    value: 248,
    delta: '+12% vs mes anterior'
  },
  {
    label: 'Ventas instaladas',
    value: 198,
    delta: '+8% vs mes anterior'
  },
  {
    label: 'Tasa de éxito',
    value: '79.8%',
    delta: '+3.2 pts'
  },
  {
    label: 'Cumplimiento global',
    value: '88%',
    delta: 'Meta 225 servicios'
  }
];

export const mockVendors = [
  {
    id: 1,
    nombre: 'María Rodríguez',
    zona: 'Tegucigalpa',
    totalVentas: 42,
    comision: 18500,
    estado: 'Activo',
    meta: 50,
    cumplimiento: 84
  },
  {
    id: 2,
    nombre: 'Carlos Hernández',
    zona: 'San Pedro Sula',
    totalVentas: 38,
    comision: 17200,
    estado: 'Activo',
    meta: 45,
    cumplimiento: 91
  }
];

export const mockClients = [
  {
    id: 1,
    nombre: 'Ana Martínez',
    identidad: '0801-1990-12345',
    fechaContratacion: '2024-02-12',
    fechaInstalacion: '2024-02-15',
    zona: 'Tegucigalpa',
    contrato: 'CL-20331',
    paquete: 'TriplePlay',
    tecnologia: 'GPON',
    monto: 1850,
    estado: 'instalada'
  },
  {
    id: 2,
    nombre: 'Luis Flores',
    identidad: '0501-1988-45987',
    fechaContratacion: '2024-02-14',
    fechaInstalacion: '2024-02-20',
    zona: 'Choluteca',
    contrato: 'CL-20346',
    paquete: 'DoublePlay',
    tecnologia: 'HFC',
    monto: 1350,
    estado: 'pendiente'
  }
];

export const mockAllies = [
  {
    id: 1,
    nombre: 'TecnoServicios HN',
    codigo: 'ALLY-001',
    telefono: '9999-1122',
    negocio: 'Tienda electrónica',
    referidos: 25,
    instalados: 18,
    comision: 24500,
    estado: 'Pagado'
  },
  {
    id: 2,
    nombre: 'Soluciones Digitales',
    codigo: 'ALLY-007',
    telefono: '8888-4411',
    negocio: 'Consultora IT',
    referidos: 17,
    instalados: 12,
    comision: 16800,
    estado: 'Pendiente'
  }
];

export const mockGoals = [
  {
    id: 1,
    vendedor: 'María Rodríguez',
    serviciosMeta: 50,
    serviciosLogrados: 42,
    porcentaje: 84
  },
  {
    id: 2,
    vendedor: 'Carlos Hernández',
    serviciosMeta: 45,
    serviciosLogrados: 41,
    porcentaje: 91
  }
];

export const mockCommissionTable = [
  {
    id: 1,
    vendedor: 'María Rodríguez',
    ventasInstaladas: 32,
    totalComisionable: 48500,
    comision: 14550,
    bonificacion: 2500,
    bonoMeta: 3000,
    bonoGrupal: 1500
  },
  {
    id: 2,
    vendedor: 'Carlos Hernández',
    ventasInstaladas: 28,
    totalComisionable: 42600,
    comision: 12780,
    bonificacion: 2000,
    bonoMeta: 2500,
    bonoGrupal: 1500
  }
];

export const mockSalesByZone = [
  { name: 'Tegucigalpa', ventas: 68 },
  { name: 'San Pedro Sula', ventas: 54 },
  { name: 'La Ceiba', ventas: 22 },
  { name: 'Choluteca', ventas: 18 }
];

export const mockSalesByTechnology = [
  { name: 'GPON', value: 45 },
  { name: 'HFC', value: 32 },
  { name: 'WTTx', value: 15 },
  { name: 'DTH', value: 8 }
];

export const mockMonthlyComparison = [
  { mes: 'Enero', instaladas: 182, ingresadas: 210 },
  { mes: 'Febrero', instaladas: 198, ingresadas: 248 }
];
