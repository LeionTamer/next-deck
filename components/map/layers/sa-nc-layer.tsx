import { valueToRgba } from '@/app/helpers/colorHelpers'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { CompositeLayer, HexagonLayer, Layer, ScatterplotLayer } from 'deck.gl'
import { VisibleLayersType } from '../deck-instance'

export interface ISANCLayer {
  areaId: number
  datasetId: number
  datasetInfo: NCDatasetType
  showLayers: VisibleLayersType[]
}

export class SANCLayer extends CompositeLayer<ISANCLayer> {
  renderLayers(): Layer[] {
    return [
      new ScatterplotLayer({
        id: `nc-scatter-plot-${this.props.areaId}`,
        data: this.props.data as NCDatasetValuesType[],

        getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
        stroked: true,
        getRadius: 200,
        getFillColor: (f: NCDatasetValuesType) =>
          valueToRgba(
            f.value,
            this.props.datasetInfo.min,
            this.props.datasetInfo.max
          ),
        getLineColor: [0, 0, 0],
        getLineWidth: 10,
        radiusScale: 6,

        pickable: this.props.showLayers.includes('scatter-plot'),
        visible: this.props.showLayers.includes('scatter-plot'),
      }),
      new HexagonLayer<NCDatasetValuesType>({
        id: `nc-hex-map-${this.props.areaId}`,
        data: this.props.data as NCDatasetValuesType[],

        extruded: this.props.showLayers.includes('elevation'),
        getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
        getColorWeight: (d: NCDatasetValuesType) => d.value,
        getElevationWeight: (d: NCDatasetValuesType) =>
          d.value / this.props.datasetInfo.max - this.props.datasetInfo.min,
        elevationScale: 30,
        radius: 3000,
        colorDomain: [this.props.datasetInfo.min, this.props.datasetInfo.max],
        colorRange: [
          [49, 163, 84, 95],
          [255, 237, 160, 60],
          [240, 59, 32, 95],
        ],

        // pickable: this.props.showLayers.includes('hex'),
        visible: this.props.showLayers.includes('hex'),
      }),
    ]
  }
}

SANCLayer.layerName = 'SANCLayer'

SANCLayer.defaultProps = {
  areaId: { type: 'number' },
  datasetId: { type: 'number' },
  data: { type: 'object' },
  showLayers: { type: 'array', value: [] as VisibleLayersType[] },
}
