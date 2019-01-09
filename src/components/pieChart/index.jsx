import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: true
    }
  }

  componentDidMount () {
    const { option } = this.props;
    if (option) {
      this.setOption();
    }
  }

  componentWillUpdate () {
    const { option } = this.props;
    if (option && this.state.update) {
      this.renderChart();
      this.setState({ update: false })
    }
  }

  renderChart () {
    const { option } = this.props;
    let pieChart = echarts.init(document.getElementById('pie-chart'));
    pieChart.setOption(option);
  }

  render () {
    return <div id='pie-chart' style={{ width: '100%', height: '400px' }}>

    </div>
  }
}

PieChart.propTypes = {
  option: PropTypes.object
}

export default PieChart;