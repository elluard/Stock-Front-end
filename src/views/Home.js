import {useEffect, useState} from 'react'

import ExpandableTable, { /*data,*/ columns } from './stockData'
import DataTable from 'react-data-table-component'

import ReactPaginate from 'react-paginate'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col } from 'reactstrap'
import { TrendingUp, User, Box, DollarSign, ChevronDown } from 'react-feather'

const Home = () => {
  // ** Vars
  const [currentPage, setCurrentPage] = useState(0)
  const [stockData, setStockData] = useState({})
  // const [stockDetailData, setStockDetailData] = useState({})


  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getMails({ q: query || '', folder: params.folder || 'inbox', label: params.label || '' }))
    // const response = await fetch('http://localhost:8080/stocks?start=2021-01-01&end=2021-01-31&ticker=SPY')
    // const data = await response.json()
    // this.setState({stockData : data})
    // GET request using fetch inside useEffect React hook
    fetch('/total')
        .then(response => response.json())
        .then(data => {
          setStockData(data.map(a => {
            return {
              fullName: a.fullName,
              ticker: a.ticker,
              price: a.closePrice,
              transactionCount: a.transactionCount,
              change: a.change.toFixed(2),
              changeRate: (a.change / a.closePrice * 100).toFixed(2),
              tradingVolume: a.tradingVolume,
              date : a.date
            }
          }))
        })
  }, [])

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
      <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          forcePage={currentPage}
          onPageChange={page => handlePagination(page)}
          pageCount={10}
          breakLabel={'...'}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName='active'
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'}
      />
  )

  return (
    <div>
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>Stock Market Indexes</CardTitle>*/}
      {/*  </CardHeader>*/}
      {/*  <CardBody>*/}
      {/*    <Row>{renderData()}</Row>*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Stock Prices</CardTitle>
        </CardHeader>
        <div className='react-dataTable'>
          <DataTable
              noHeader
              // pagination
              data={stockData}
              expandableRows
              columns={columns}
              expandOnRowClicked
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              // paginationComponent={CustomPagination}
              // paginationDefaultPage={currentPage + 1}
              expandableRowsComponent={ExpandableTable}
              // paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
      </Card>
    </div>
  )
}

export default Home
