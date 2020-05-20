import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import Swal from 'sweetalert2';
import { PageMode } from 'src/app/Enum/PageMode';
import { Cookies } from 'src/app/Model/Cookies';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() entityName: string;
  @Input() columns: any[]; 
  @Input() mode: PageMode;
  @Input() updateMode:string;
  @Input() createHidden:boolean = false;
  @Input() updateHidden:boolean = false;
  @Input() emailHidden:boolean = true;
  @Output() modeChange = new EventEmitter();
  rowId:number; 
  private gridApi; 
  public updateData: any;
  private gridColumnApi;
  private rowSelection;
  private rowModelType; 
  private rowData: [];
  private columnDefs: any[];
  public newItem: any;
  dataSource;
  constructor(private defaultService:DefaultService<Cookies>) { }

  ngOnInit() {  
    this.rowSelection = "single";   
  }
  onGridReady(params){ 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.columnDefs = this.columns;
    this.defaultService.getItems(this.entityName).subscribe(data => {   
      this.dataSource = params.api.setRowData(data); 
      console.log(data);
    });

  }
  onSelectionChanged(){ 
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = 0;
    selectedRows.forEach(function(selectedRow) {
      selectedRowsString = selectedRow.id;
    });
    if (selectedRowsString != null) {
      this.rowId = selectedRowsString;
    }
  }
  delete(id:number){
    if (id != undefined) {
      Swal.fire({
        title: 'Kayıt silinsin mi?!', 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır',
        reverseButtons: true
      }).then((willDelete) => {
        if (willDelete.value) {
          this.defaultService.delete(this.entityName , this.rowId).subscribe(data => {
            var selectedData = this.gridApi.getSelectedRows();
            var res = this.gridApi.updateRowData({ remove: selectedData });
          })
        }
      })
    }
  }
  onPageSizeChanged(newPageSize) {
    var value = document.getElementById("page-size");
    this.gridApi.paginationSetPageSize(Number(value)); 
  }
  createNew(){
    debugger;
    this.updateData == null; 
    this.mode = PageMode.Create;
    this.modeChange.emit(this.mode);
  } 
}
