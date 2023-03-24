import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef } from 'react';
import info from '../data/data.json'
import district from '../data/quan_huyen.json'
import city from '../data/tinh_tp.json'
function Search() {
    var data = info.map(function (item) {
        var cityInfo = city[item.city];
        var districtInfo = district[item.district];
        return Object.assign({}, item, { city: cityInfo }, { district: districtInfo });
    });
    const [codeCity, setCodeCity] = useState(0)
    const [codeDistrict, setcodeDistrict] = useState(0)
    const seclecedpriceElm = useRef()
    const seclecedAreaElm = useRef()
    const [filterResult, setFilterResult] = useState(data)

    function filterData(inputData, cityID, districtID, priceFrom, priceTo, areaFrom, areaTo) {
        return inputData.filter(function (item) {
            return (item.city.code === cityID &&
                item.district.code === districtID &&
                item.price >= priceFrom &&
                item.price <= priceTo &&
                item.area >= areaFrom &&
                item.area <= areaTo);
        });
    }
    const districtFilter = Object.values(district).filter(district => district.parent_code === codeCity)
    const handlerFilter = (e) => {
        e.preventDefault()
        var priceFrom = seclecedpriceElm.current.value.split('-')[0];
        var priceTo = seclecedpriceElm.current.value.split('-')[1];
        var areaFrom = seclecedAreaElm.current.value.split('-')[0];
        var areaTo = seclecedAreaElm.current.value.split('-')[1];
        let dataFilter = data;
        if (priceFrom && priceTo && areaFrom && areaTo) {
            dataFilter = filterData(Object.values(data), codeCity, codeDistrict, priceFrom, priceTo, areaFrom, areaTo);

        }
        setFilterResult(dataFilter)
    }

    const handleSelectCity = (e) => {
        const codeCity = e.target.value
        setCodeCity(codeCity)
    };
    const handleSelecedDistrict = (e) => {
        setcodeDistrict(e.target.value)
    }
    return (
        <div className="page-container">
            <header className='header'>
                <div className='container'>
                    <div className='row'>
                        <div className='col col-lg-8'>
                            <form onSubmit={handlerFilter} className='form-container d-flex '>
                                <div className="form-group">
                                    <label htmlFor="header_province">Tỉnh Thành</label>
                                    <select onClick={handleSelectCity} className="form-control" id="header_province">
                                        <option value={0}>Tỉnh thành</option>
                                        {Object.values(city).map((city, index) => (
                                            <option value={city.code} key={index}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="header_district">Quận huyện </label>
                                    <select onClick={handleSelecedDistrict} className="form-control" id="header_district">
                                        <option value={0}>Quận huyện</option>
                                        {districtFilter.map((district, index) => (
                                            <option value={district.code} key={index}>{district.name_with_type}</option>
                                        ))}

                                    </select>
                                </div> <div className="form-group">
                                    <label htmlFor="header_price">Khoảng giá</label>
                                    <select ref={seclecedpriceElm} className="form-control" id="header_price">
                                        <option>Chọn mức giá</option>
                                        <option value="0-1000000">Dưới 1 triệu</option>
                                        <option value="1000000-2000000">1 triệu đến 2 triệu</option>
                                        <option value="2000000-3000000">2 triệu đến 3 triệu</option>
                                        <option value="3000000-5000000">3 triệu đến 5 triệu</option>
                                        <option value="5000000-7000000">5 triệu đến 7 triệu</option>
                                        <option value="7000000-10000000">10 triệu đến 7 triệu</option>
                                    </select>
                                </div> <div className="form-group">
                                    <label htmlFor="header_area">Diện tích</label>
                                    <select ref={seclecedAreaElm} className="form-control" id="header_area">
                                        <option>Chọn diện tích</option>
                                        <option value="0-20">Dưới 20 m2 </option>
                                        <option value="20-30">20 m2 - 30 m2</option>
                                        <option value="30-50">30 m2 - 50 m2</option>
                                        <option value="50-60">50 m2 - 60 m2</option>
                                        <option value="60-70">60 m2 - 70 m2</option>
                                        <option value="70-80">70 m2 - 80 m2</option>
                                    </select>
                                </div>
                                <button type={'submit'} className='btn-submit' >Lọc tin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container wide body'>
                <div className='row content-container'>
                    {filterResult.map((item, index) => (
                        <div key={index} className='col content col-lg-12 '>
                            <div className='content_item'>
                                <div className='content_item-img'>
                                    <img src={item.thumbnail} />
                                </div>
                                <div className='content_item-info'>
                                    <p className='content_item-title'>{item.title}</p>
                                    <p className='content_item-price'>{item.price} triệu/tháng</p>
                                    <div className='content_item-area'>
                                        <p> Diện tích: <span><strong>{item.area}</strong>  m2</span></p>
                                        <p>Khu vực: <span>{item.district.path_with_type}</span></p>
                                    </div>
                                    <p className='content_item-des'>{item.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}
export default Search