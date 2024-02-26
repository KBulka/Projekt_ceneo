
function DataGrid({ arr }) {
    return (
        <>
            {
                arr.map((info, index) => (
                    <>
                        <strong>{info.key}</strong>: {info.value}
                        <br />
                    </>
                ))
            }
        </>
    );
}

export default DataGrid;