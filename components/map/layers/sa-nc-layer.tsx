import { colorSpectral, getColorFromValue } from '@/app/helpers/colorHelpers'
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
        getRadius: 300,
        getFillColor: (f: NCDatasetValuesType) =>
          getColorFromValue(
            f.value,
            this.props.datasetInfo.min,
            this.props.datasetInfo.max,
            // 0,
            // 365,
            colorSpectral
          ) as [number, number, number],
        getLineColor: (f: NCDatasetValuesType) =>
          getColorFromValue(
            f.value,
            this.props.datasetInfo.min,
            this.props.datasetInfo.max,
            // 0,
            // 365,
            colorSpectral
          ) as [number, number, number],
        getLineWidth: 100,
        radiusScale: 6,

        pickable: this.props.showLayers.includes('scatter-plot'),
        visible: this.props.showLayers.includes('scatter-plot'),
      }),
      new HexagonLayer<NCDatasetValuesType>({
        id: `nc-hex-map-${this.props.areaId}`,
        data: this.props.data as NCDatasetValuesType[],

        getPosition: (d: NCDatasetValuesType) => [d.lon, d.lat],
        radius: 4000,
        material: {
          ambient: 1,
          diffuse: 0.05,
          specularColor: [0.3, 0.1, 0.2],
        },
        colorScaleType: 'quantize',
        getColorWeight: (d: NCDatasetValuesType) => d.value,
        colorAggregation: 'MAX',
        colorRange: [
          [0, 255, 0, 95], // Green
          [255, 165, 0, 98], // Orange
          [255, 0, 0, 95], // Red
        ],
        getElevationWeight: (d: NCDatasetValuesType) => d.value,
        elevationAggregation: 'MAX',
        elevationScale: 12,
        extruded: this.props.showLayers.includes('elevation'),
        elevationScaleType: 'linear',

        pickable: this.props.showLayers.includes('hex'),
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
