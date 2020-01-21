import { Pipe, PipeTransform } from '@angular/core';
import { assetUrl } from '../single-spa/asset-url';
@Pipe({
  name: 'assetUrl'
})
export class AssetUrlPipe implements PipeTransform 
{
  public transform(value: any, args?: any): any {
    return assetUrl(value);
  }
}