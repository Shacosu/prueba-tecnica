import {useState, useEffect} from 'react'

const initialState = [{'978020137962': {'nombre_producto': 'Hervidor 2 litros TH-4515N', 'datos_query': [{'name': 'Hervidor 2 litros TH-4515N', 'sku': 'P-4342', 'ean': '978020137962', 'market': 'Somela', 'final_price': 21990}, {'name': 
'Hervidor 2 litros TH-4515N', 'sku': 'P-1034', 'ean': '978020137962', 'market': 'MiIdea', 'final_price': 17990}], 'cantidad_markets_diferentes': 2, 'rango_precios': (21990, 17990)}}, {'3966955703878': {'nombre_producto': 'Polera Manga Corta Hombre Tommy Hilfiger', 'datos_query': [{'name': 'Polera Manga Corta Hombre Tommy Hilfiger', 'sku': 'P-5443', 'ean': '3966955703878', 'market': 'Tommy Hilfiger', 'final_price': 19990}], 'cantidad_markets_diferentes': 1, 'rango_precios': (19990, 19990)}}, {'7110764642620': {'nombre_producto': 'Desigual Blusa Manga Larga Estampada Mujer', 'datos_query': [{'name': 'Desigual Blusa Manga Larga Estampada Mujer', 'sku': 'P-1354', 'ean': '7110764642620', 'market': 'Desigual', 'final_price': 44990}], 'cantidad_markets_diferentes': 1, 'rango_precios': (44990, 44990)}}]

const markets = {
  "somela": "https://www.somela.cl",
  "miidea": "https://www.midea.com/cl",
  "tommy hilfiger": "https://cl.tommy.com/",
  "desigual": "https://www.desigual.com/es_CL/"
}

export default function App() {
  const [data, setData] = useState(initialState)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const filterData = () => {
      const newData = initialState.filter((product) => {
        return product[Object.keys(product)[0]].nombre_producto.toLowerCase().includes(filter.toLowerCase())
      })
      setData(newData)
    }
    setTimeout(filterData, 1000)
  }, [filter])

  const formatNumber = (number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(number)

  return (
    <div className="container mx-auto p-4">
      <div className="my-2 space-y-2">
        <h1 className="text-3xl">Products</h1>
        <input type="text" className="p-2 border" placeholder="Filter your product" onChange={(e) => setFilter(e.target.value)}  />
      </div>
      {data.length === 0 && <div className="bg-yellow-500 text-white font-bold shadow-lg max-w-sm text-center p-4 rounded border">No results</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((product, index) => {
        const productObject = product[Object.keys(product)[0]];
        const { nombre_producto, cantidad_markets_diferentes } = productObject;
        return (
          <div key={index} className="bg-white shadow-lg p-4 rounded border">
            <h2 className="text-xl line-clamp-1 font-bold" title={nombre_producto}>{nombre_producto}</h2>
            <p className="text-sm font-semibold text-gray-500">Total markets: {cantidad_markets_diferentes}</p>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start">#</th>
                  <th className="text-start">Market</th>
                  <th className="text-start">Price</th>
                </tr>
              </thead>
              {productObject.datos_query.map((market, index) => {
                const marketName = market.market;
                return (
                  <tbody key={index}>
                    <tr className="border-b">
                      <td>{index + 1}</td>
                      <td>
                        <a href={markets[marketName.toLowerCase()]} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                          {marketName}
                        </a>
                      </td>
                      <td>{formatNumber(market.final_price)}</td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        )
      }
      )}
      </div>
    </div>
  )
}
