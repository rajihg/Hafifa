import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LocationPin from '../assets/marker-icon.png';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import * as ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  popupContainerStyle: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  popupContentStyle: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
  },
  strongStyle: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
}));

const DisplayMap = ({ tasks, onLocationSelected, openPopup}) => {
  const classes = useStyles();

  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const mapInstance = useRef(null);
  const viewlayRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      layerRef.current = new VectorLayer({
        source: new VectorSource(),
      });
      mapInstance.current.addLayer(layerRef.current);
    }
  }, [])
 
  useEffect(() => {
    if (mapInstance.current) {
      layerRef.current.getSource().clear();
      const features = tasks.map((task) => {
        const markerFeature = new Feature({
          geometry: new Point(task.taskLocation),
        });

        const iconStyle = new Style({
          image: new Icon({
            src: LocationPin,
            color: openPopup? 'red' : task.isCompleted? 'lightgreen' : 'white',
            anchor: [0.5, 1],
          }),
        });

        markerFeature.setStyle(iconStyle);
        return markerFeature;
      });

      if (openPopup) {
      mapInstance.current.on('click', (event) => {
        
        const clickedCoordinate = event.coordinate;
        onLocationSelected(clickedCoordinate);
        layerRef.current.getSource().clear();

        const markerFeature = new Feature({
          geometry: new Point(clickedCoordinate),
        });

        const iconStyle = new Style({
          image: new Icon({
            src: LocationPin,
            anchor: [0.5, 1],
          }),
        });

        markerFeature.setStyle(iconStyle);
        layerRef.current.getSource().addFeature(markerFeature);
      
      }); }
      else {
        if (mapInstance.current) {
        const selectInteraction = new Select();
        mapInstance.current.addInteraction(selectInteraction);
  
        selectInteraction.on('select', (event) => {
          const selectedFeature = event.selected[0];
  
          if (selectedFeature) {
            const coordinates = selectedFeature.getGeometry().getCoordinates();
            const taskDetails = tasks.find(
              (task) =>
                task.taskLocation[0] === coordinates[0] && task.taskLocation[1] === coordinates[1]
            );
            if (taskDetails) {
              if (!viewlayRef.current) {
                  viewlayRef.current = new Overlay({
                  element: document.createElement('div'),
                  positioning: 'top-center',
                  offset: [0, -15],
                });
  
                mapInstance.current.addOverlay(viewlayRef.current);
              }
              
              const popupContent = (
              <div className={classes.popupContentStyle}>
              <div className={classes.strongStyle}>Task Details</div>
              <p>Task Name: {taskDetails.taskName}</p>
              <p>Task Subject: {taskDetails.taskSubject}</p>
            </div>
              )
  
              ReactDOM.render(popupContent, viewlayRef.current.getElement());
              viewlayRef.current.setPosition(coordinates);
            }
  
          } else {
            if (viewlayRef.current) {
              viewlayRef.current.setPosition(null);
            }
          }
        });
      }
    }
      layerRef.current.getSource().addFeatures(features);
      
    }
  }, [tasks]);

  if (openPopup) {
    return <div ref={mapRef} style={{ width: '100%', height: '200px', paddingTop: '25px', paddingBottom: '25px' }} />
  }
  else {  
    return <div ref={mapRef} style={{ width: '100%', height: '600px', paddingTop: '100px', paddingBottom: '25px' }} />
  }
};

export default DisplayMap;