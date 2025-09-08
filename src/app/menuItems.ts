export interface MenuItem {
  id: string,
  route: string,
  title : string,
  icon: string,
  isActive: boolean,
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    icon: 'pi pi-home',
    isActive: false,
    route: '/dashboard',
    title: 'Dashboard'
  },
  {
    id: '2',
    icon: 'pi pi-users',
    isActive: false,
    route: '/users',
    title: 'Users'
  },
  {
    id: '3',
    icon: 'pi pi-shopping-cart',
    isActive: false,
    route: '/products',
    title: 'Products'
  },
  {
    id: '4',
    icon: 'pi pi-cog',
    isActive: false,
    route: '/settings',
    title: 'Settings'
  }
]
