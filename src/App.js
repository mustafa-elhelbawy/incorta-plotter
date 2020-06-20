import React from 'react';
import { connect } from "react-redux";
import { getColumnsRequest } from "./store/actions/columns";
import './App.scss';
import Loader from "./components/loader/loader";
import LineChart from "./components/charts/lineChart/lineChart";

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   feeds: this.getFeeds()
    // };

    // console.log(this.getFeeds());

    this.state = {
      feeds: [
        {
          "name": "Product",
          "values": [
            "Diskette",
            "Memory Card",
            "HDTV Tuner",
            "Flat Panel Graphics Monitor",
            "Digital Camera",
            "Minitower Speaker",
            "Extension Cable",
            "Y Box"
          ]
        },
        {
          "name": "Cost",
          "values": [
            333.08,
            7.07,
            10.77,
            194.76,
            13.18,
            143.3,
            20.2,
            405
          ]
        }
      ]
    }
  }

  componentDidMount() {
    this.props.getColumnsRequest();
  }

  getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for(var i = 0; i < numItems; i++) {
      data.push({
        label: names[i],
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }
  
  getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for(var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }

  
  getFeeds() {
    let feeds = [];
  
    feeds.push({
      title: 'Visits',
      data: this.getRandomDateArray(20)
    });
  
    feeds.push({
      title: 'Categories',
      data: this.getRandomArray(20)
    });
  
    feeds.push({
      title: 'Categories',
      data: this.getRandomArray(10)
    });
  
    feeds.push({
      title: 'Data 4',
      data: this.getRandomArray(6)
    });
  
    return feeds;
  }
  
  allowDrop(event) {
    event.preventDefault();
  }

  drag(event, item) {
    event.dataTransfer.setData("chartData", item);
  }

  drop(event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("chartData"));
    console.log(data);
    // event.target.appendChild(document.getElementById(data));
  }

  render() {
    const { loader, columnsList } = this.props;
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
                    draggable="true" onDragStart={(event) => this.drag(event, JSON.stringify(col))}>
                      {col.name}
                    </li>
                  ))
                }
              </ul>
            </aside>
            <main className="col-8">
              <h2>Chart here to be displayed</h2>
              <div data-allowed="dimension" className="dropArea border border-dark w-75 my-2"
              onDragOver={this.allowDrop} onDrop={this.drop}>

              </div>
              <div data-allowed="measure" className="dropArea border border-dark w-75 my-2"
              onDragOver={this.allowDrop} onDrop={this.drop}>

              </div>
              <div className="w-75 m-auto">
                <LineChart
                  data={{
                    xAxis: this.state.feeds[0],
                    yAxis: this.state.feeds[1]
                  }}
                  title={this.state.feeds[0].name}
                  color="#3E517A"
                />
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
  columnsList: state.columns.list
});
const mapDispatchToProps = {
  getColumnsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
