import React from 'react';
import { connect } from "react-redux";
import { getColumnsRequest } from "./store/actions/columns";
import { setDimension, clearDimension } from "./store/actions/dimension";
import { setMeasure, clearMeasure } from "./store/actions/measure";
import { getDataRequest, getDataResponse } from "./store/actions/data";
import './App.scss';
import Loader from "./components/loader/loader";
import LineChart from "./components/charts/lineChart/lineChart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimension: null,
      measure: null,
      feeds: []
    }
  }

  componentDidMount() {
    this.props.getColumnsRequest();
  }

  componentDidUpdate(prevProps) {
    const { dimension:dimensionPrevProp, measure:measurePrevProp } = prevProps;
    const { dimension:dimensionProp, measure:measureProp } = this.props;
    if (dimensionPrevProp?.name !== dimensionProp?.name || 
      measurePrevProp?.name !== measureProp?.name) {
      debugger
      if(dimensionProp && measureProp) {
        this.props.getDataRequest({
          "dimension": `${dimensionProp.name}`,
          "measures": [`${measureProp.name}`]
        });
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { chart } = props;
    return {
      feeds: chart && chart.length > 0 ? chart : []
    };
  }
  
  allowDrop = (event) => {
    event.preventDefault();
  }

  drag = (event, item) => {
    event.dataTransfer.setData("chartData", item);
  }

  drop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("chartData"));
    this.setState({
      [data.function]: data.name
    }, () => {
      console.log(this.state)
    });

    if(data.function === 'dimension') {
      this.props.setDimension(data);
    } else {
      this.props.setMeasure(data);
    }
  }

  clear = (event, area) => {
    this.props.getDataResponse(null);
    if(area === 'dimension') {
      this.props.clearDimension();
    } else {
      this.props.clearMeasure();
    }
  }

  render() {
    const { feeds } = this.state;
    const { loader, columnsList, dimension, measure } = this.props;
    return (
      <div className="App">
        {
          loader &&
          <Loader />
        }
        <div className="container-fluid">
          <div className="row text-center">
            <aside className="col-4">
              <h1>Incorta plotter</h1>
              <ul className="text-left">
                {
                  columnsList.map((col, i) => (
                    <li key={`column_${i}`} className="h4"
                    id={`column_${i}`} data-function={{}}
                    draggable="true" 
                    onDragStart={(event) => this.drag(event, JSON.stringify(col))}>
                      {col.name}
                    </li>
                  ))
                }
              </ul>
            </aside>
            <main className="col-8 text-center">
              <h2>Chart here to be displayed</h2>
              <div className="row dropAreasWrapper">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <label className="">Dimension</label>
                  <div data-allowed="dimension" 
                  className="dropArea d-flex align-items-center border border-dark w-100 m-2 p-2"
                  onDragOver={this.allowDrop} onDrop={this.drop}>
                    {
                      dimension && 
                      <span className="badge badge-info p-2">
                        {dimension.name}
                      </span>
                    }
                  </div>
                  <button onClick={(event) => this.clear(event, 'dimension')}
                  className="btn btn-danger btn-sm ml-auto">
                    Clear
                  </button>
                </div>
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <label className="">Measures</label>
                  <div data-allowed="measure" 
                  className="dropArea d-flex align-items-center border border-dark w-100 m-2 p-2"
                  onDragOver={this.allowDrop} onDrop={this.drop}>
                    {
                      measure && 
                      <span className="badge badge-info p-2">
                        {measure.name}
                      </span>
                    }
                  </div>
                  <button onClick={(event) => this.clear(event, 'measure')}
                  className="btn btn-danger btn-sm ml-auto">
                    Clear
                  </button>
                </div>
              </div>
              <div className="w-75 m-auto">
                {
                  (feeds && feeds.length > 0) ?
                  <LineChart
                    data={{
                      xAxis: this.state.feeds[0],
                      yAxis: this.state.feeds[1]
                    }}
                    title={this.state.feeds[0].name}
                    color="#3E517A"
                  /> :
                  <div className="w-75 my-5">
                    <h2 className="my-5">
                      No Dimension or Measure has been selected yet
                    </h2>
                    <small className="text-muted">
                      Dimension could be (Product, Year or Country) &
                      Measure could be (Cost, Revenu or Unit Slots)
                    </small>
                  </div>
                }
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loader: state.loader,
  columnsList: state.columns.list,
  dimension: state.dimension.column,
  measure: state.measure.column,
  chart: state.data.chart
});
const mapDispatchToProps = {
  getColumnsRequest,
  setDimension,
  clearDimension,
  setMeasure,
  clearMeasure,
  getDataRequest,
  getDataResponse
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
