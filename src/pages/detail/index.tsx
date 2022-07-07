import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { fetchUserById } from './reducer'
import { requestDetail } from '@/api/detail'
import { useAppDispatch, useAppSelector } from '../hooks/useDispatch'

const Detail = () => {
  const dispatch = useAppDispatch()
  const { loading, detailData } = useAppSelector((state) => {
    console.log(state.detailReducer)
    return state.detailReducer
  })

  const requestData = () => {
    dispatch(fetchUserById())
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
