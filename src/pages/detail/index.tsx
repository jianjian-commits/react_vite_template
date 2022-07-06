import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { fetchUserById } from './reducer'
import { requestDetail } from '@/api/detail'

const Detail = () => {
  const dispatch = useDispatch()

  const { loading, detailData } = useSelector((state) => {
    console.log((state as any).detailReducer)
    return (state as any).detailReducer
  })

  const requestData = () => {
    dispatch(fetchUserById(22222))
  }

  const fetchData = async () => {
    const res = await requestDetail(
      JSON.stringify({ appEnv: 'PROD', entToken: '111117' })
    )
  }
  const fetchData2 = async () => {
    const res = await requestDetail({ appEnv: 'PROD', entToken: '111117' })
  }

  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        detailData.map((item) => <span key={item}>{item}</span>)
      )}
      <Button onClick={() => requestData()}>请求</Button>
      <Button onClick={() => fetchData()}>错误请求接口</Button>
      <Button onClick={() => fetchData2()}>正确请求接口</Button>
    </div>
  )
}

export default Detail
