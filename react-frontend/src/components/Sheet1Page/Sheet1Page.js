import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { DownloadService } from "../../services/downloadService";

import AreYouSureDialog from "../common/AreYouSureDialog";
import Sheet1Datatable from "./Sheet1DataTable";
import Sheet1EditDialogComponent from "./Sheet1EditDialogComponent";
import Sheet1CreateDialogComponent from "./Sheet1CreateDialogComponent";
import Sheet1FakerDialogComponent from "./Sheet1FakerDialogComponent";
import Sheet1SeederDialogComponent from "./Sheet1SeederDialogComponent";

const Sheet1Page = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [showAreYouSureDialog, setShowAreYouSureDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFakerDialog, setShowFakerDialog] = useState(false);
    const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
    const [showSeederDialog, setShowSeederDialog] = useState(false);
    const [selectedEntityIndex, setSelectedEntityIndex] = useState();
    const urlParams = useParams();

    useEffect(() => {
        //on mount
        client
            .service("sheet1")
            .find({ query: { $limit: 10000  , $populate : [
                {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },            {
                path: "updatedBy",
                service: "users",
                select: ["name"],
              }
            ] }})
            .then((res) => {
                let results = res.data;
                 
                setData(results);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sheet1", type: "error", message: error.message || "Failed get sheet1" });
            });
    }, [showFakerDialog,showDeleteAllDialog]);


    const onEditRow = (rowData, rowIndex) => {
        setSelectedEntityIndex(rowIndex);
        setShowEditDialog(true);
    };

    const onCreateResult = (newEntity) => {
        setData([...data, newEntity]);
    };
    const onFakerCreateResults = (newEntities) => {
        setSelectedEntityIndex();
        setData([...data, ...newEntities]);
    };
    const onSeederResults = (newEntities) => {
        setSelectedEntityIndex();
        setData([...data, ...newEntities]);
    };

    const onEditResult = (newEntity) => {
        let _newData = _.cloneDeep(data);
        _newData[selectedEntityIndex] = newEntity;
        setData(_newData);
    };

    const onDownloadAll = () => {
        
    }

    const deleteRow = async () => {
        try {
            await client.service("sheet1").remove(data[selectedEntityIndex]?._id);
            let _newData = data.filter((_, i) => i !== selectedEntityIndex);
            setData(_newData);
            setSelectedEntityIndex();
            setShowAreYouSureDialog(false)
        } catch (error) {
            console.log({ error });
            props.alert({ title: "Sheet1", type: "error", message: error.message || "Failed delete record" });
        }
    };
    const onRowDelete = (index) => {
        setSelectedEntityIndex(index);
        setShowAreYouSureDialog(true);
    };

    const onShowDeleteAll = (rowData, rowIndex) => {
        setShowDeleteAllDialog(true);
    };

    const deleteAll = async () => {
        setShowDeleteAllDialog(false);
        const countDataItems = data?.length;
        const promises = data.map((e) => client.service("sheet1").remove(e._id));
        await Promise.all(
          promises.map((p) =>
            p.catch((error) => {
              props.alert({
                title: "Sheet1",
                type: "error",
                message: error.message || "Failed to delete all records",
              });
              console.log({ error });
            })
          )
        );
        await props.alert({
          title: "Sheet1",
          type: "warn",
          message: `Successfully dropped ${countDataItems} records`,
        });
      };

    const onRowClick = ({data}) => {
        
        navigate(`/sheet1/${data._id}`);
    };

    const menuItems = [
        {
            label: "Faker",
            icon: "pi pi-sliders-h",
            command: (e) => {
                setShowFakerDialog(true);
            },
            show : true
        },
        {
            label: "Seeder",
            icon: "pi pi-forward",
            command: (e) => {
                setShowSeederDialog(true);
            },
            show : true
        },
        {
            label: `Drop ${data?.length}`,
            icon: "pi pi-trash",
            command: (e) => {
                setShowDeleteAllDialog(true);
            },
        },
        {
            label: `Download All`,
            icon: "pi pi-download",
            command : () => onDownloadAll()
        },
        {
            label: `Search`,
            icon: "pi pi-search",
        },
        {
            label: `Check`,
            icon: "pi pi-list-check",
        },
    ];


    return (

        <div className="mt-5"  style={{minHeight : 'calc(90vh - 9rem)'}}>
            <div className="grid">
                <div className="col-6 flex justify-content-start">
                    <h3 className="mb-0 ml-2">Sheet1 </h3>
                </div>
                <div className="col-6 flex justify-content-end">
                {!urlParams.singleUsersId ? (
                    <>
                    <Button label="add" icon="pi pi-plus" onClick={() => setShowCreateDialog(true)} role="sheet1-add-button"/>
                    <SplitButton model={menuItems.filter((m) => !(m.icon==="pi pi-trash" && data?.length===0))} dropdownIcon="pi pi-ellipsis-v" buttonClassName="hidden" menuButtonClassName="ml-1 p-button-text"></SplitButton>
                    </>
                ) : null }
                </div>
            </div>
            <div className="grid align-items-center">
                <div className="col-12" role="sheet1-datatable">
                    <Sheet1Datatable items={data} onRowDelete={onRowDelete} onEditRow={onEditRow} onRowClick={onRowClick} />
                 </div>
            </div>
            <AreYouSureDialog header="Delete" body="Are you sure you want to delete this record?" show={showAreYouSureDialog} onHide={() => setShowAreYouSureDialog(false)} onYes={() => deleteRow()} />
            <Sheet1EditDialogComponent entity={data[selectedEntityIndex]} show={showEditDialog} onHide={() => setShowEditDialog(false)} onEditResult={onEditResult} />
            <Sheet1CreateDialogComponent show={showCreateDialog} onHide={() => setShowCreateDialog(false)} onCreateResult={onCreateResult} />
            <Sheet1FakerDialogComponent show={showFakerDialog} onHide={() => setShowFakerDialog(false)} onFakerCreateResults={onFakerCreateResults} />
            <Sheet1SeederDialogComponent show={showSeederDialog} onHide={() => setShowSeederDialog(false)} onSeederResults={onSeederResults} />
            <AreYouSureDialog header={`Drop ${data?.length} records`} body={`Are you sure you want to drop ${data?.length} records?`} show={showDeleteAllDialog} onHide={() => setShowDeleteAllDialog(false)} onYes={() => deleteAll()} />
        </div>
    );
};
const mapState = (state) => ({
    //
});
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    
});

export default connect(mapState, mapDispatch)(Sheet1Page);
