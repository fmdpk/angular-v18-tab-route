export interface MenuItem {
  id: string,
  route: string,
  title : string,
  icon: string,
  isActive: boolean,
  outlet: string
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    icon: 'pi pi-home',
    isActive: false,
    route: '/dashboard',
    title: 'Dashboard',
    outlet: 'Dashboard'
  },
  {
    id: '2',
    icon: 'pi pi-home',
    isActive: false,
    route: '/dashboard/:id',
    title: 'Dashboard Detail',
    outlet: 'DashboardDetail'
  },
  {
    id: '3',
    icon: 'pi pi-users',
    isActive: false,
    route: '/users',
    title: 'Users',
    outlet: 'Users'
  },
  {
    id: '4',
    icon: 'pi pi-shopping-cart',
    isActive: false,
    route: '/products',
    title: 'Products',
    outlet: 'Products'
  },
  {
    id: '5',
    icon: 'pi pi-cog',
    isActive: false,
    route: '/settings',
    title: 'Settings',
    outlet: 'Settings'
  },
  {
    id: '6',
    icon: 'pi pi-warehouse',
    isActive: false,
    route: '/',
    title: 'Home',
    outlet: 'Home'
  },
]
