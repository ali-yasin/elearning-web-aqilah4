<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Dashboard - <?php echo $this->config->item('nama_aplikasi')." ".$this->config->item('versi'); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<link href="<?php echo base_url(); ?>___/css/bootstrap.css" rel="stylesheet">
<link href="<?php echo base_url(); ?>___/css/style.css?<?php echo time(); ?>" rel="stylesheet">
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<style type="text/css">
    .no-js #loader { display: none;  }
    .js #loader { display: block; position: absolute; left: 100px; top: 0; }
    .se-pre-con {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url(<?php echo base_url('___/img/facebook.gif'); ?>) center no-repeat #fff;
    }

    .ajax-loading {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: #6f6464;
        opacity: 0.75;
        color: #fff;
        text-align: center;
        font-size: 25px;
        padding-top: 200px;
        display: none;
    }
</style>
</head>
<body>
<div class="se-pre-con"></div>

<nav class="navbar navbar-findcond navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand"><i class="glyphicon glyphicon-globe"></i> Ujian Online</a>
        </div>

        <div class="collapse navbar-collapse" id="navbar">
            <ul class="nav navbar-nav navbar-right" style="z-index: 1000">
                <li><a class="#" onclick="return simpan_akhir();"><i class="glyphicon glyphicon-stop"></i> Selesai Ujian</a></li>
            </ul>
        </div>
    </div>
</nav>


<div class="floating container">
    <a id="tbl_show_jawaban" href="#" onclick="return show_jawaban()" class="btn btn-info" title="Tampilkan bilah jawaban"><i class="glyphicon glyphicon-search"></i> Lihat Jawaban</a>
</div>

<div class="dmobile">
    <div class="col-md-3" id="v_jawaban">
        <div class="panel panel-default">
            <div class="panel-heading" id="nav_soal" style="overflow: auto">
                <div class="btn btn-default col-md-12"><i class="fa fa-search"></i> Navigasi Soal</div>
            </div>
            <div class="panel-body" style="overflow: auto;  height: 450px; padding: 10px">
                <div id="tampil_jawaban" class="text-center"></div>
            </div>
        </div>
    </div>

    <div class="col-md-9">
        <form role="form" name="_form" method="post" id="_form">
            <div class="panel panel-default">
                <div class="panel-heading">Soal Ke <div class="btn btn-info" id="soalke"></div>
        
                    <div class="tbl-kanan-soal">
                        <div id="clock" style="font-weight: bold" class="btn btn-danger"></div>
                    </div>
                </div>

                <div class="panel-body" style="overflow: auto">
                <?php echo $html; ?>
                </div>

                <div class="panel-footer text-center">
                    <a class="action back btn btn-info" rel="0" onclick="return back();"><i class="glyphicon glyphicon-chevron-left"></i> Back</a>

                    <a class="action next btn btn-info" rel="2" onclick="return next();"><i class="glyphicon glyphicon-chevron-right"></i> Next</a>

                    <a class="ragu_ragu btn btn-warning" rel="1" onclick="return tidak_jawab();">Ragu-ragu</a>
                    
                    <a class="selesai action submit btn btn-danger" onclick="return simpan_akhir();"><i class="glyphicon glyphicon-stop"></i> Selesai</a>

                    <input type="hidden" name="jml_soal" id="jml_soal" value="<?php echo $no; ?>">
                </div>
            </div>
        </form>
    </div>

</div>

<div class="ajax-loading"><i class="fa fa-spin fa-spinner"></i> Loading ...</div>
<!--
<div class="col-md-12 footer">
 <a href="<?php echo base_url(); ?>adm"><?php echo $this->config->item('nama_aplikasi')." ".$this->config->item('versi')."</a><br> Waktu Server: ".tjs(date('Y-m-d H:i:s'),"s")." - Waktu Database: ".tjs($this->waktu_sql,"s"); ?>. 
</div>
-->


<script src="<?php echo base_url(); ?>___/js/jquery-1.11.3.min.js"></script> 
<script src="<?php echo base_url(); ?>___/js/bootstrap.js"></script>
<script src="<?php echo base_url(); ?>___/plugin/countdown/jquery.countdownTimer.js"></script> 
<script src="<?php echo base_url(); ?>___/plugin/jquery_zoom/jquery.zoom.min.js"></script>

<script type="text/javascript">
    var base_url = "<?php echo base_url(); ?>";
    id_tes = "<?php echo $id_tes; ?>";
    $(window).load(function() {
        $(".se-pre-con").fadeOut("slow");
    });

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    }
    
    $(document).on("ready", function(){
        $('.gambar').each(function(){
            var url = $(this).attr("src");
            $(this).zoom({url: url});
        });
            
        hitung();
        simpan_sementara();
        buka(1);

        widget      = $(".step");
        btnnext     = $(".next");
        btnback     = $(".back"); 
        btnsubmit   = $(".submit");

        $(".step").hide();
        $(".back").hide();
        $("#widget_1").show();
    });
      
    widget      = $(".step");
    total_widget = widget.length;
    
    simpan_sementara = function() {
        var f_asal  = $("#_form");
        var form  = getFormData(f_asal);
        //form = JSON.stringify(form);
        var jml_soal = form.jml_soal;
        jml_soal = parseInt(jml_soal);

        var hasil_jawaban = "";

        for (var i = 1; i < jml_soal; i++) {
            var idx = 'opsi_'+i;
            var idx2 = 'rg_'+i;
            var jawab = form[idx];
            var ragu = form[idx2];

            if (jawab != undefined) {
                if (ragu == "Y") {
                    if (jawab == "-") {
                        hasil_jawaban += '<a id="btn_soal_'+(i)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i)+');">'+(i)+". "+jawab+"</a>";
                    } else {
                        hasil_jawaban += '<a id="btn_soal_'+(i)+'" class="btn btn-warning btn_soal btn-sm" onclick="return buka('+(i)+');">'+(i)+". "+jawab+"</a>";
                    }
                } else {
                    if (jawab == "-") {
                        hasil_jawaban += '<a id="btn_soal_'+(i)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i)+');">'+(i)+". "+jawab+"</a>";
                    } else {
                        hasil_jawaban += '<a id="btn_soal_'+(i)+'" class="btn btn-success btn_soal btn-sm" onclick="return buka('+(i)+');">'+(i)+". "+jawab+"</a>";
                    }
                }
            } else {
                hasil_jawaban += '<a id="btn_soal_'+(i)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i)+');">'+(i)+". -</a>";
            }
        }

        $("#tampil_jawaban").html('<div id="yes"></div>'+hasil_jawaban);
    }

    simpan = function() {
        var f_asal  = $("#_form");
        var form  = getFormData(f_asal);
        
        $.ajax({    
            type: "POST",
            url: base_url+"adm/ikut_ujian/simpan_satu/"+id_tes,
            data: JSON.stringify(form),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function() {
                $('.ajax-loading').show();    
            }
        }).done(function(response) {
            $('.ajax-loading').hide(); 
            
            var hasil_jawaban = "";
            var panjang       = response.data.length;
            
            for (var i = 0; i < panjang; i++) {
                if (response.data[i] != "_N") {
                    var getjwb = response.data[i];
                    var pc_getjwb = getjwb.split('_');

                    if (pc_getjwb[1] == "Y") {
                        if (pc_getjwb[0] == "-") {
                            hasil_jawaban += '<a id="btn_soal_'+(i+1)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i+1)+');">'+(i+1)+". "+pc_getjwb[0]+"</a>";
                        } else {
                            hasil_jawaban += '<a id="btn_soal_'+(i+1)+'" class="btn btn-warning btn_soal btn-sm" onclick="return buka('+(i+1)+');">'+(i+1)+". "+pc_getjwb[0]+"</a>";
                        }
                    } else {
                        if (pc_getjwb[0] == "-") {
                            hasil_jawaban += '<a id="btn_soal_'+(i+1)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i+1)+');">'+(i+1)+". "+pc_getjwb[0]+"</a>";
                        } else {
                            hasil_jawaban += '<a id="btn_soal_'+(i+1)+'" class="btn btn-success btn_soal btn-sm" onclick="return buka('+(i+1)+');">'+(i+1)+". "+pc_getjwb[0]+"</a>";
                        }
                    }
                } else {
                    hasil_jawaban += '<a id="btn_soal_'+(i+1)+'" class="btn btn-default btn_soal btn-sm" onclick="return buka('+(i+1)+');">'+(i+1)+". -</a>";
                }
            }

            //$("#tampil_jawaban").html('<div id="yes"></div>'+hasil_jawaban);
        });
        return false;
    }
    
    hitung = function() {
        var tgl_mulai = '<?php echo date('Y-m-d H:i:s'); ?>';
        var tgl_selesai = '<?php echo $jam_selesai; ?>';

        $("div#clock").countdowntimer({
            startDate : tgl_mulai,
            dateAndTime : tgl_selesai,
            size : "lg",
            displayFormat: "HMS",
            timeUp : selesai,
        });
    }

    selesai = function() {
        var f_asal  = $("#_form");
        var form  = getFormData(f_asal);
        simpan_akhir(id_tes);
        window.location.assign("<?php echo base_url(); ?>adm/sudah_selesai_ujian/"+id_tes); 
          
        return false;
    }

    next = function() {
        var berikutnya  = $(".next").attr('rel');
        berikutnya = parseInt(berikutnya);
        berikutnya = berikutnya > total_widget ? total_widget : berikutnya;

        $("#soalke").html(berikutnya);

        $(".next").attr('rel', (berikutnya+1));
        $(".back").attr('rel', (berikutnya-1));
        $(".ragu_ragu").attr('rel', (berikutnya));
        cek_status_ragu(berikutnya);
        cek_terakhir(berikutnya);
        
        var sudah_akhir = berikutnya == total_widget ? 1 : 0;

        $(".step").hide();
        $("#widget_"+berikutnya).show();

        if (sudah_akhir == 1) {
            $(".back").show();
            $(".next").hide();
        } else if (sudah_akhir == 0) {
            $(".next").show();
            $(".back").show();
        }

        simpan_sementara();
        simpan();
    }

    back = function() {
        var back  = $(".back").attr('rel');
        back = parseInt(back);
        back = back < 1 ? 1 : back;

        $("#soalke").html(back);
        
        $(".back").attr('rel', (back-1));
        $(".next").attr('rel', (back+1));
        $(".ragu_ragu").attr('rel', (back));
        cek_status_ragu(back);
        cek_terakhir(back);
        
        $(".step").hide();
        $("#widget_"+back).show();

        var sudah_awal = back == 1 ? 1 : 0;
         
        $(".step").hide();
        $("#widget_"+back).show();
        
        if (sudah_awal == 1) {
            $(".back").hide();
            $(".next").show();
        } else if (sudah_awal == 0) {
            $(".next").show();
            $(".back").show();
        }

        simpan_sementara();
        simpan();
    }

    tidak_jawab = function() {
        var id_step = $(".ragu_ragu").attr('rel');
        var status_ragu = $("#rg_"+id_step).val();

        if (status_ragu == "N") {
            $("#rg_"+id_step).val('Y');
            $("#btn_soal_"+id_step).removeClass('btn-success');
            $("#btn_soal_"+id_step).addClass('btn-warning');

        } else {
            $("#rg_"+id_step).val('N');
            $("#btn_soal_"+id_step).removeClass('btn-warning');
            $("#btn_soal_"+id_step).addClass('btn-success');
        }


        cek_status_ragu(id_step);

        simpan_sementara();
        simpan();
    }

    cek_status_ragu = function(id_soal) {
        var status_ragu = $("#rg_"+id_soal).val();

        if (status_ragu == "N") {
            $(".ragu_ragu").html('Ragu');
        } else {
            $(".ragu_ragu").html('Tidak Ragu');
        }
    }

    cek_terakhir = function(id_soal) {
        var jml_soal = $("#jml_soal").val();
        jml_soal = (parseInt(jml_soal) - 1);

        if (jml_soal == id_soal) {
            $(".selesai").show();
        } else {
            $(".selesai").hide();
        }
    }

    buka = function(id_widget) {
        $(".next").attr('rel', (id_widget+1));
        $(".back").attr('rel', (id_widget-1));
        $(".ragu_ragu").attr('rel', (id_widget));
        cek_status_ragu(id_widget);
        cek_terakhir(id_widget);

        $("#soalke").html(id_widget);
        
        $(".step").hide();
        $("#widget_"+id_widget).show();
    }

    simpan_akhir = function() {
        simpan();
        if (confirm('Ujian telah selesai. Anda yakin akan mengakhiri tes ini..?')) {
            simpan();
            $.ajax({
                type: "GET",
                url: base_url+"adm/ikut_ujian/simpan_akhir/"+id_tes,
                beforeSend: function() {
                    $('.ajax-loading').show();    
                },
                success: function(r) {
                    if(r.status == "ok") {
                        window.location.assign("<?php echo base_url(); ?>adm/sudah_selesai_ujian/"+id_tes); 
                    }
                }
            });

            return false;
        }
    }

    show_jawaban = function() {
        $("#v_jawaban").toggle();
    }
    </script>
</body>
</html>
