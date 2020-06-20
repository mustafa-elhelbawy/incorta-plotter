import React from 'react';
import { connect } from "react-redux";
import { getColumnsRequest } from "./store/actions/columns";
import { setDimension, clearDimension } from "./store/actions/dimension";
import { setMeasure, clearMeasure } from "./store/actions/measure";
import { getDataRequest, getDataResponse } from "./store/actions/data";
import Loader from "./components/loader/loader";
import LineChart from "./components/charts/lineChart/lineChart";
import DropArea from "./components/dropArea/dropArea";
import Columns from "./components/columns/columns";
import './App.scss';

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

  renderColumns = (cols) => {
    return(
      (cols && cols.length > 0 ) ? 
      <Columns 
        attr={{
          class: "text-left nav flex-column"
        }}
        list={cols}
        item={{
          class: "h6 nav-item",
          prefix: "column_",
          key: 'name',
          attr: {
            draggable: true
          },
          listeners:{
            dragstart: this.drag
          }
        }}
      /> :
      <h6 className="text-muted">
        No columns loaded yet...
      </h6>
    )
  }

  renderDropArea = (param, axis) => (
    <DropArea
      wrapperClass="col-12 d-flex justify-content-between align-items-center"
      droppable={{
        class: "dropArea d-flex align-items-center border border-dark w-100 m-2 p-2",
        listeners: {
          dragover: this.allowDrop,
          drop: this.drop
        }
      }}
      label={{
        text: axis,
        class: "h5"
      }}
      items={{
        param,
        function: axis,
        key: 'name',
        class: "badge badge-info p-2"
      }}
      actions={{
        clear:{
          text: 'Clear',
          class:'btn btn-danger ml-auto',
          click: this.clear
        }
      }}
    />
  )
    
  renderLineChart = () => {
    const { feeds } = this.state;
    return(
      (feeds && feeds.length > 0) ?
      <LineChart
        data={{
          xAxis: feeds[0],
          yAxis: feeds[1]
        }}
        title={feeds[0].name}
        color="#3E517A"
      /> :
      <div className="w-75 my-5">
        <h2 className="my-5">
          Please, select parameters!
        </h2>
        <small className="text-muted">
          - Dimension could be (Product, Year or Country) <br/>
          - Measure could be (Cost, Revenu or Unit Slots).
        </small>
      </div>
    )
  }

  render() {
    const { loader, columnsList, dimension, measure } = this.props;
    return (
      <div className="App">
        {loader && <Loader />}
        <div className="container-fluid p-0">
          <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <h2 className="navbar-brand col-md-3 col-lg-2 m-0 px-3">
              Incorta Plotter
            </h2>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>

          <div className="container-fluid">
            <div className="row">
              <nav id="sidebarMenu" 
              className="col-md-3 col-lg-2 d-md-block px-4 bg-light sidebar collapse">
                <h5 className="my-3">Columns List</h5>
                <div className="sidebar-sticky pt-3">
                  {this.renderColumns(columnsList)}
                </div>
              </nav>

              <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 text-center">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Dashboard</h1>
                  <br/>
                </div>
                <div className="alert alert-warning alert-dismissible h6" role="alert">
                  <strong>Hello! </strong> 
                  You should drag items from the left sidebar into the Dimension & Measure areas to start chart data
                </div>
                <div className="row dropAreasWrapper">
                  {this.renderDropArea(dimension, 'dimension')}
                  {this.renderDropArea(measure, 'measure')}
                </div>
                <div className="w-75 m-auto">
                  {this.renderLineChart()}
                </div>
              </main>
            </div>
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
