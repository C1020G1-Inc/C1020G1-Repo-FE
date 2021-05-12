export class Province {
  provinceId: number;
  provinceName: string;
}

export class District {
  districtId: number;
  districtName: string;
  province: Province;
}

export class Ward{
  wardId: number;
  district: District;
  wardName: string;
}
