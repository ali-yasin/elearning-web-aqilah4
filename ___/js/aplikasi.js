$(document).ready(function() {
	
	$('.gambar').each(function(){
		var url = $(this).attr("src");
		$(this).zoom({url: url});
	});

	var url = get_url(parseInt(uri_js));
	var url2 = get_url((parseInt(uri_js)+1));
	var url3 = get_url((parseInt(uri_js)+2));
	//console.log(url);

	if (url == "m_siswa") {
		pagination("datatabel", base_url+"adm/m_siswa/data", []);
	} else if (url == "m_guru") {
		pagination("datatabel", base_url+"adm/m_guru/data", []);		
	} else if (url == "m_mapel") {
		pagination("datatabel", base_url+"adm/m_mapel/data", []);		
	} else if (url == "m_soal") {
		pagination("datatabel", base_url+"adm/m_soal/data", []);

		if (url2 == "edit") {
			if (editor_style == "inline") {
				CKEDITOR.inline('editornya');
				CKEDITOR.inline('editornya_a');
				CKEDITOR.inline('editornya_b');
				CKEDITOR.inline('editornya_c');
				CKEDITOR.inline('editornya_d');
				CKEDITOR.inline('editornya_e');
			} else if (editor_style == "replace") {
				CKEDITOR.replace('editornya');
				CKEDITOR.replace('editornya_a');
				CKEDITOR.replace('editornya_b');
				CKEDITOR.replace('editornya_c');
				CKEDITOR.replace('editornya_d');
				CKEDITOR.replace('editornya_e');
			}
		}		
	} else if (url == "h_ujian") {
		if (url2 == "det") {
			pagination("datatabel", base_url+"adm/h_ujian/data_det/"+url3, []);
		} else {
			pagination("datatabel", base_url+"adm/h_ujian/data", []);	
		}
	} else if (url == "m_ujian") {
		if (url2 == "det") {
			pagination("datatabel", base_url+"adm/m_ujian/data_det/"+url3, []);
		} else {
			pagination("datatabel", base_url+"adm/m_ujian/data", []);	
		}
	} else if (url == "ikut_ujian") {
		if (url2 == "token") {
			timer();
		} 
	} 
});

function timer() {
	var tgl_sekarang = $("#_tgl_sekarang").val();
	var tgl_mulai = $("#_tgl_mulai").val();
    var tgl_terlambat = $("#_terlambat").val();
	var id_ujian = $("#id_ujian").val();
	var statuse = $("#_statuse").val();
	statuse = parseInt(statuse);

	if (statuse == 1) {
		$("#btn_mulai").html('<a href="#" class="btn btn-success btn-lg" id="tbl_mulai" onclick="return konfirmasi_token('+id_ujian+')"><i class="fa fa-check-circle"></i> MULAI</a>');
		
		$('#waktu_akhir_ujian').countdowntimer({
	        startDate : tgl_sekarang,
	        dateAndTime : tgl_terlambat,
	        size : "lg",
	        labelsFormat : true,
	 		timeUp : hilangkan_tombol,
	    });
	} else if (statuse == 0) {
		$("#btn_mulai").addClass("btn btn-success btn-lg");
		$("#waktu_").hide();
		$('#akan_mulai').countdowntimer({
	        startDate : tgl_sekarang,
	        dateAndTime : tgl_mulai,
	        size : "lg",
	        labelsFormat : true,
	 		timeUp : timeIsUp,
	    });
	} else if (statuse == 2) {
		hilangkan_tombol();
	} else {
		hilangkan_tombol();
	}
}

function timeIsUp() {
	var id_ujian = $("#id_ujian").val();
	$("#btn_mulai").html('<a href="#" class="btn btn-success btn-lg" id="tbl_mulai" onclick="return konfirmasi_token('+id_ujian+')"><i class="fa fa-check-circle"></i> MULAI</a>');

	var tgl_sekarang = $("#_tgl_sekarang").val();
	var tgl_mulai = $("#_tgl_mulai").val();
    var tgl_terlambat = $("#_terlambat").val();
}

function hilangkan_tombol() {
	$("#btn_mulai").hide();
	$("#waktu_").hide();
	$("#waktu_game_over").html('<a class="btn btn-danger btn-lg" onclick="return alert(\'Waktu selesai..!\');">Waktu Ujian Selesai</a>');
}


/* FUNGSI BERSAMA */
function get_url(segmen) {
	var url1 = window.location.protocol;
	var url2 = window.location.host;
	var url3 = window.location.pathname;
	var pathArray = window.location.pathname.split('/');
	return pathArray[segmen];
}
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

function pagination(indentifier, url, config) {
    $('#'+indentifier).DataTable({
        "language": {
            "url": base_url+"___/plugin/datatables/Indonesian.json"
        },
        "ordering": false,
        "columnDefs": config,
        "bProcessing": true,
        "serverSide": true,
        "bDestroy" : true,
        "ajax":{
            url : url, // buat json datasource
            type: "post",  // buat type of method  , by default would be get
            error: function(){  // buat error handling code
                $("#"+indentifier).css("display","none");
            }
        }
    }); 
}

function login(e) {
	e = e || window.event;
	var data 	= $('#f_login').serialize();
	$("#konfirmasi").html("<div class='alert alert-info'><i class='icon icon-spinner icon-spin'></i> Checking...</div>")
	$.ajax({
		type: "POST",
		data: data,
		url: base_url+"adm/act_login",
		success: function(r) {
			if (r.log.status == 0) {
				$("#konfirmasi").html("<div class='alert alert-danger'>"+r.log.keterangan+"</div>");
			} else {
				$("#konfirmasi").html("<div class='alert alert-success'>"+r.log.keterangan+"</div>");
				window.location.assign(base_url+"adm"); 
			}
		}
	});
	return false;
}

function konfirmasi_token(id) {
	var token_asli = $("#_token").val();
	var token_input = $("#token").val();

	if (token_asli != token_input) {
		alert("Token salah..!");
		return false;
	} else {
		alert("Token benar..!");
		window.location.assign(base_url+"adm/ikut_ujian/_/"+id); 
	}
}


function m_soal_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_soal/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_soal"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	
	return false;
}
//ujian
function m_ujian_e(id) {
	$("#m_ujian").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama_ujian").val(data.nama_ujian);
			$("#mapel").val(data.id_mapel);
			$("#jumlah_soal").val(data.jumlah_soal);
			$("#waktu").val(data.waktu);
			$("#terlambat").val(data.terlambat);
			$("#terlambat2").val(data.terlambat2);
			$("#tgl_mulai").val(data.tgl_mulai);
			$("#wkt_mulai").val(data.wkt_mulai);
			$("#acak").val(data.jenis);
			$("#nama_ujian").focus();
			__ambil_jumlah_soal(data.id_mapel);
		}
	});
	
	return false;
}
function m_ujian_s() {
	var f_asal	= $("#f_ujian");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_ujian/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_ujian"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}
function m_ujian_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_ujian/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_ujian"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	
	return false;
}
function refresh_token(id) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/refresh_token/"+id,
		success: function(response) {
			if (response.status == "ok") {
				pagination("datatabel", base_url+"adm/m_ujian/data", []);	
			} else {
				console.log('gagal');
			}
		}
	});
	
	return false;
}

/* admindos las puerta conos il grande partite */
//siswa
function m_siswa_e(id) {
	$("#m_siswa").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_siswa/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama").val(data.nama);
			$("#nim").val(data.nim);
			$("#jurusan").val(data.jurusan);
			$("#nama").focus();
		}
	});
	return false;
}
function m_siswa_s() {
	var f_asal	= $("#f_siswa");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_siswa/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_siswa"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}
function m_siswa_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function m_siswa_u(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIS ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/user/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}

function aktifkan_semua_siswa () {
	if (confirm('Anda yakin akan mengaktifkan untuk seluruh user ..?')) {
		
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/aktifkan_semua/",
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
		
	}

	return false;
}
function m_siswa_ur(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIS ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/user_reset/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
function m_siswa_non_aktif(id) {
	if (confirm('Anda yakin akan menonaktifkan user ini..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_siswa/non_aktifkan/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_siswa"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
//guru
function m_guru_e(id) {
	$("#m_guru").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_guru/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nip").val(data.nip);
			$("#nama").val(data.nama);
			$("#nama").focus();
		}
	});
	return false;
}
function m_guru_s() {
	var f_asal	= $("#f_guru");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_guru/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_guru"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}
function m_guru_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function m_guru_u(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIP')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/user/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
function m_guru_ur(id) {
	if (confirm('Anda yakin..? Username dan Password otomatis adalah NIP ..!')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_guru/user_reset/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_guru"); 
				} else {
					alert(response.caption);
				}
			}
		});
	}
	return false;
}
function m_guru_matkul(id) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_guru/ambil_matkul/"+id,
		success: function(data) {
			if (data.status == "ok") {
				var jml_data	= Object.keys(data.data).length;
				var hate 	= '<div class="modal fade" id="m_siswa_matkul" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 id="myModalLabel">Setting Mata Kuliah</h4></div><div class="modal-body"><form name="f_siswa_matkul" id="f_siswa_matkul" method="post" onsubmit="return m_guru_matkul_s();"><input type="hidden" name="id_mhs" id="id_mhs" value="'+id+'"><div id="konfirmasi"></div>';
				
				if (jml_data > 0) {
					$.each(data.data, function(i, item) {
						if (item.ok == "1") {
							hate += '<label><input type="checkbox" value="'+item.id+'" name="id_mapel_'+item.id+'" checked> &nbsp;'+item.nama+'</label> &nbsp;&nbsp; ';
						} else {
							hate += '<label><input type="checkbox" value="'+item.id+'" name="id_mapel_'+item.id+'"> &nbsp;'+item.nama+'</label> &nbsp;&nbsp; ';
						}
					});				
				} else {
					hate += 'Belum ada data..';
				}
				hate += '<div class="modal-footer"><button class="btn btn-primary" type="submit">Simpan</button><button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button></div></form></div></div></div>';
				$("#tampilkan_modal").html(hate);
				$("#m_siswa_matkul").modal('show');
			} else {
				console.log('gagal');
			}
		}
	});
	return false;
}
function m_guru_matkul_s() {
	var f_asal	= $("#f_siswa_matkul");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_guru/simpan_matkul",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_guru"); 
		} else {
			console.log('gagal');
		}
	});
	
	return false;
}
//mapel
function m_mapel_e(id) {
	$("#m_mapel").modal('show');
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_mapel/det/"+id,
		success: function(data) {
			$("#id").val(data.id);
			$("#nama").val(data.nama);
			$("#nama").focus();
		}
	});
	return false;
}
function m_mapel_s() {
	var f_asal	= $("#f_mapel");
	var form	= getFormData(f_asal);
	$.ajax({		
		type: "POST",
		url: base_url+"adm/m_mapel/simpan",
		data: JSON.stringify(form),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8'
	}).done(function(response) {
		if (response.status == "ok") {
			window.location.assign(base_url+"adm/m_mapel"); 
		} else {
			console.log('gagal');
		}
	});
	return false;
}
function m_mapel_h(id) {
	if (confirm('Anda yakin..?')) {
		$.ajax({
			type: "GET",
			url: base_url+"adm/m_mapel/hapus/"+id,
			success: function(response) {
				if (response.status == "ok") {
					window.location.assign(base_url+"adm/m_mapel"); 
				} else {
					console.log('gagal');
				}
			}
		});
	}
	return false;
}
function __ambil_jumlah_soal(id_mapel) {
	$.ajax({
		type: "GET",
		url: base_url+"adm/m_ujian/jumlah_soal/"+id_mapel,
		success: function(response) {
			$("#jumlah_soal1").val(response.jumlah);	
		}
	});
	return false;
}