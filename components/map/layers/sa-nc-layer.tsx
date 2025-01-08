import { valueToRgba } from '@/app/helpers/colorHelpers'
import { NCDatasetType, NCDatasetValuesType } from '@/db/au/nc-dataset'
import { StatisticalAreaGeometryType } from '@/db/au/statistical-area'
import { CompositeLayer, GeoJsonLayer, Layer, ScatterplotLayer } from 'deck.gl'

export interface ISANCLayer {
  areaId: number
  datasetId: number
  datasetInfo: NCDatasetType
}

export class SANCLayer extends CompositeLayer<ISANCLayer> {
  renderLayers(): Layer[] {
    return [
      new GeoJsonLayer<StatisticalAreaGeometryType>({
        id: `nc-polygon-layer-${this.props.areaId}`,
        data: `/api/au-sa?areaId=${this.props.areaId}`,
        stroked: true,
        filled: false,
        pickable: true,
        getLineColor: [160, 160, 180, 200],
        getLineWidth: 800,
        getPointRadius: 4,
        getTextSize: 12,
      }),
      new ScatterplotLayer({
        id: `nc-scatter-plot-${this.props.areaId}`,
        data: `/api/au-nc?areaId=${this.props.areaId}&datasetId=${this.props.datasetId}`,
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
}
