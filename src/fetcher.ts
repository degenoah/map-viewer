import shp from 'shpjs';
import { BaseData, DateData, FortificationsData } from './types';

export const fetchBaseData = async (): Promise<BaseData> => {
  // data url
  const DATA_URL =
    'https://raw.githubusercontent.com/owlmaps/map-data/master/data/base.json';
  // const DATA_URL = 'http://localhost:8000/base.json';
  let data = null;
  try {
    const dataJson = await fetch(DATA_URL);
    data = await dataJson.json();
  } catch (error) {
    console.log(error);
    return data;
  }
  return data;
};

export const fetchDateData = async (dateKey: string): Promise<DateData> => {
  // data url
  const DATA_URL = `https://raw.githubusercontent.com/owlmaps/map-data/master/data/${dateKey}.json`;
  // const DATA_URL = `http://localhost:8000/${dateKey}.json`;
  let data = null;
  try {
    const dataJson = await fetch(DATA_URL);
    data = await dataJson.json();
  } catch (error) {
    console.log(error);
    return data;
  }
  return data;
};

export const fetchFortificationsData = async (): Promise<FortificationsData> => {
  const DATA_URL = 'https://raw.githubusercontent.com/degenoah/map-viewer/master/public/fortifications';
  // const DATA_URL = 'http://localhost:4173/map-viewer/fortifications';

  let data = null;
  try {
    // TODO: zip contents.
    const trenchesCollection = await shp(`${DATA_URL}/trenches.shp`);
    const miscCollection = await shp(`${DATA_URL}/misc.shp`);
    
    data = {
      trenches: trenchesCollection,
      misc: miscCollection,
    };
    // console.log(trenchesCollection.features[0]);
  } catch (error) {
    console.log(error);
  }

  return data;
}
