import request from '@/request'
export const requestDetail = async (params: any) => {
  await request.POST('/api/summer/widget/route/match', params)
}
