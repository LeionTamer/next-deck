import { NCDatasetValuesType } from '@/db/au/nc-dataset'
import { StatisiticalAreaByIdType } from '@/db/au/statistical-area'
import { CompositeLayer, Layer, PolygonLayer, ScatterplotLayer } from 'deck.gl'

export interface ISANCLayer {
  areaId: number
  datasetId: number
}

export class SANCLayer extends CompositeLayer<ISANCLayer> {
  renderLayers(): Layer[] {
    return [
      new ScatterplotLayer({
        id: `nc-scatter-plot-${this.props.areaId}`,
        data: `/api/au-nc?areaId=${this.props.areaId}&datasetId=${this.props.datasetId}`,
        getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
        stroked: true,
        getRadius: 200,
        getFillColor: [255, 0, 0],
        getLineColor: [0, 0, 0],
        getLineWidth: 10,
        radiusScale: 6,
        pickable: true,
      }),
      new PolygonLayer<StatisiticalAreaByIdType>({
        id: `nc-polygon-layer-${this.props.areaId}`,
        data: `/api/au-sa?areaId=${this.props.areaId}`,
        getPolygon: (d: StatisiticalAreaByIdType) => d.coordinates,
        getFillColor: [20, 20, 20, 20],
        getLineColor: [255, 30, 255, 160],
        filled: true,
        stroked: true,
        lineWidthMinPixels: 2,
        pickable: true,
        getLineWidth: 500,
      }),
    ]
  }
}

SANCLayer.layerName = 'SANCLayer'

SANCLayer.defaultProps = {
  areaId: { type: 'number' },
  datasetId: { type: 'number' },
}
