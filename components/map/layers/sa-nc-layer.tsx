import { valueToRgba } from '@/app/helpers/colorHelpers'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { CompositeLayer, Layer, ScatterplotLayer } from 'deck.gl'

export interface ISANCLayer {
  areaId: number
  datasetId: number
  datasetInfo: NCDatasetType
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
        pickable: true,
      }),
    ]
  }
}

SANCLayer.layerName = 'SANCLayer'

SANCLayer.defaultProps = {
  areaId: { type: 'number' },
  datasetId: { type: 'number' },
  data: { type: 'object' },
}
