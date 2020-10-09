// Api response
export interface IResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface IListResponse<T> {
  endRow: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: T[]
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums: number[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  size: number
  startRow: number
  total: number
}

export interface IUser {
  address: string
  createTime: string
  email: string
  id: number
  newAlert: number
  nickName: string
  tradeAlert: number
  updateTime: string
  userId: number
  userLevel: number
}

export interface IUserPayload {
  email?: string
  newAlert?: number
  tradeAlert?: number
  userName?: string
}

export interface IBanner {
  id: number
  imageUrl: string
}

export interface IAsset {
  contractAdd: string
  createHeight?: string
  createTime?: string
  dealPrice?: string
  expirationHeight?: string
  id?: number
  operator?: string
  orderHash?: string
  orderId?: string
  orderType?: string
  platformFee?: string
  price?: string
  salt?: string
  side?: string
  status?: number
  tokenId: string
  txid?: string
  viewNum?: number
}

export interface PageParam {
  page: number
  pageSize: number
}

export interface IProject {
  alias: string
  contractAdds: string[]
  createTime?: string
  des?: string
  id: number
  imageUrl: string
  images?: string[]
  logoUrl: string
  name: string
  status: number
  type: string
  weight: number
}

export type AssetType =
  | 'HOT'
  | 'NEW'
  | 'VIRTUAL_WORLDS'
  | 'DOMAIN_NAMES'
  | 'BLOCKCHAIN_ART'
  | 'TRADING_CARDS'
  | 'COLLECTIBLES'
  | 'SPORTS'
  | 'UTILITY'
  | 'GAME'

export interface IRanking {
  assets: number
  avgPrice: string
  createTime: string
  id: number
  logoUrl: string
  name: string
  owners: number
  projectId: number
  total: number
  transactions: number
  turnoverRate: number
  type: string
  types: AssetType[]
}

export type ActivityType = 0 | 1 | 2 | 3 | 4 //0全部 1上架物品 2定价出售 3拍卖出售 4转赠

export interface IActivity {
  contractAdd: string
  createHeight: string
  createTime: string
  dealPrice: string
  expirationHeight: string
  id: number
  operator: string
  orderHash: string
  orderId: string
  orderType: string
  platformFee: string
  price: string
  salt: string
  seller?: string
  side: 'BUY' | 'SELL'
  status: number
  tokenId: string
  txid: string
}
