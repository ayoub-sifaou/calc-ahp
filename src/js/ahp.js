
$(document).ready(function () {

    let tableCol = [],
        col = '#col',
        colNext = '#colNext',
        elementTable = '#tableMatOne',
        elementVer = '#btnVer',
        elementBtn = '.btnVerif',
        elementBtnNextPrevEtap= '.btnNextPrevEtap',
        calcVecteur = '#calcVecteur',
        btnPrevEtap = '#btnPrevEtap',
        etaPres = '.etaPres',
        etaNex = '.etaNex',
        sommeCol = [],
        tableLineSommeGlobal = [],
        arrayColName = [],
        vecteurGlobal = [],
        matVecteur = [],
        ahpMatrix = '.ahpMatrix',
        matrixNex = '.matrixNex',
        ahpMatrixThead = '.ahpMatrixThead tr',
        ahpMatrixTbody = '.ahpMatrixTbody',
        matrixNexResult = '.matrixNexResult',
        inputDataMat = '.inputDataMat',
        RI = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

    $(col).on('click', function () {
        let my = $(this),
            element = my.parent().parent().find('input'),
            elementTr = '.theadMatOne tr',
            elementRowNameInput = '.row-name',
            elementTbodyTr = '.tbodyMatOne';

        if(element.val() === '') {
            alert('input vide');
        } else if(!isNaN(element.val())) {
            alert('enter character string');
        } else if(tableCol.includes(element.val())) {
            alert('element exist');
        } else {
            $(elementTable).removeClass('d-none');
            $(elementRowNameInput).removeClass('d-none');

            tableCol.push(element.val());
            element.val('');

            $(elementTr).empty();

            $(elementTr).prepend('<th scope="col">#</th>')

            tableCol.forEach(function(item){
                $(elementTr).append('<th id="col-'+ item +'" class="text-capitalize" scope="col">'+ item +'</th>')
            });

            let index = 0;

            $(elementTbodyTr).empty();

            tableCol.forEach(function(item){
                $(elementTbodyTr).append('<tr class="tr-row" id="tr-row-'+ index +'"><td><strong class="text-capitalize">'+ item +'</strong></td></tr>')
                ++index;
            });

            $('.tr-row').each(function (i) {
                tableCol.forEach(function(item){
                    $('#tr-row-'+ i).append('<td><input type="number" max="9" min="0" name="item-'+ item.replace(/\s/g, '') +'-'+ i +'" id="item-'+ item.replace(/\s/g, '') +'-'+ i +'" class="form-control inputDataMatStyle inputDataMat"></td>')
                })
            })

            if(tableCol.length > 2) {
                $(elementBtn).removeClass('d-none');
            } else {
                $(elementBtn).removeClass('d-none');
                $(elementBtn).addClass('d-none');
            }
        }

    })

    $(colNext).on('click', function () {
        let my = $(this),
            html = '<div class="row mx-0">',
            element = my.parent().parent().find('input');
        if(element.val() === '') {
            alert('input vide');
        } else if(!isNaN(element.val())) {
            alert('enter character string');
        } else if(arrayColName.includes(element.val())) {
            alert('element exist');
        } else {
            arrayColName.push(element.val());
            element.val('');

            for (let m=0 ; m < tableCol.length ; m++) {
                html += ' <div class="col-md-6">\n' +
                    '                            <div class="tableMat-'+ m +'">\n' +
                    '                                <div class="mb-3"><strong>MJ pour le critèr  '+ tableCol[m] +'</strong></div>'+
                    '                                <table class="table" id="tableMatOne-'+ m +'">\n' +
                    '                                    <thead class="theadMatOne-'+ m +'">\n' +
                    '                                    <tr>\n' +
                    '\n' +
                    '                                    </tr>\n' +
                    '                                    </thead>\n' +
                    '                                    <tbody class="tbodyMatOne-'+ m +'">\n' +
                    '\n' +
                    '                                    </tbody>\n' +
                    '                                </table>\n' +
                    '                            </div>\n' +
                    '                        </div>'
            }

            html += '</div>'
            $(matrixNex).empty();
            $(matrixNex).append(html);

            for (let l=0 ; l < tableCol.length ; l++) {

                let elementTr = '.theadMatOne-'+ l +' tr',
                    elementTbodyTr = '.tbodyMatOne-'+ l;

                $(elementTr).empty();

                $(elementTr).prepend('<th scope="col">#</th>')

                arrayColName.forEach(function(item){
                    $('.theadMatOne-'+ l +' tr').append('<th id="col-'+ l +'-'+ item +'" class="text-capitalize" scope="col">'+ item +'</th>')
                });

                let index = 0;

                $(elementTbodyTr).empty();

                arrayColName.forEach(function(item){
                    $(elementTbodyTr).append('<tr class="tr-row-'+ l +'" id="tr-row-'+ l +'-'+ index +'"><td><strong class="text-capitalize">'+ item +'</strong></td></tr>')
                    ++index;
                });

                $('.tr-row-'+ l).each(function (i) {
                    arrayColName.forEach(function(item){
                        $('#tr-row-'+ l +'-'+ i).append('<td><input type="number" max="9" min="0" name="item-matrix-'+ l +'-'+ item +'-'+ i +'" id="item-matrix-'+ l +'-'+ item +'-'+ i +'" class="form-control inputDataMatStyle inputDataNewMatrix"></td>')
                    })
                })

            }

            if(arrayColName.length >= 3) {
                $(calcVecteur).removeClass('d-none');
            } else {
                $(calcVecteur).removeClass('d-none');
                $(calcVecteur).addClass('d-none');
            }
        }
    })

    $(elementVer).on('click', function () {

        let arrayTest = [],
            testFil = true;


        $(inputDataMat).each(function (index){
            let my = $(this);
            arrayTest.push(my.val())
        })

        for (let m=0 ; m < arrayTest.length ; m++) {
            if(arrayTest[m] === '') {
                testFil = false;
                break;
            } else {
                testFil = true;
            }
        }

        if(!testFil) {
            alert('fill matrix !')
        } else {
            sommeCol=[];
            for(let i=0; i < tableCol.length; i++) {
                let somme = 0;
                for(let j=0; j < tableCol.length; j++) {
                    let value = Number($('#item-'+ tableCol[i] +'-'+ j).val());
                    somme = value + somme;
                }
                sommeCol.push(somme);
            }

            let myArrayMat = new Array(tableCol.length);
            for(let i=0; i<tableCol.length; i++)
            {
                myArrayMat[i]=new Array(tableCol.length);
            }

            for(let d=0; d < tableCol.length; d++) {
                for(let f=0; f < tableCol.length; f++) {
                    let value = Number($('#item-'+ tableCol[d] +'-'+ f).val());
                    myArrayMat[f][d] = value/sommeCol[d];
                }
            }

            let tableLineSomme = [];

            for(let h=0; h < tableCol.length; h++) {
                let sommeLin = 0;
                for(let k=0; k < tableCol.length; k++) {
                    sommeLin = sommeLin + myArrayMat[h][k];
                }
                tableLineSomme.push(sommeLin / tableCol.length);
                tableLineSommeGlobal.push(sommeLin / tableCol.length);
            }

            let myArrayMatOne = new Array(tableCol.length);
            for(let i=0; i<tableCol.length; i++)
            {
                myArrayMatOne[i]=new Array(tableCol.length);
            }

            for(let x=0; x < tableCol.length; x++) {
                for(let q=0; q < tableCol.length; q++) {
                    let value = Number($('#item-'+ tableCol[x] +'-'+ q).val());
                    myArrayMatOne[q][x] = value * tableLineSomme[x];
                }
            }

            let tableLineSommeTwo = [];

            for(let l=0; l < tableCol.length; l++) {
                let sommeLin = 0;
                for(let w=0; w < tableCol.length; w++) {
                    sommeLin = sommeLin + myArrayMatOne[l][w];
                }
                tableLineSommeTwo.push(sommeLin / tableLineSomme[l]);
            }

            let reducer = (accumulator, curr) => accumulator + curr;

            let moy = tableLineSommeTwo.reduce(reducer) / tableLineSommeTwo.length;

            let newMoy = ((moy - tableCol.length) / (tableCol.length - 1)) / RI[tableCol.length - 1] ;

            $('.alertTest').remove();

            if(newMoy > 0.1) {
                $(elementBtnNextPrevEtap).removeClass('d-none');
                $(elementBtnNextPrevEtap).addClass('d-none');
                $(elementBtn).append('<div class="col-md-12 alertTest mt-3">\n' +
                    '                                <div class="alert alert-danger" role="alert">\n' +
                    '                                    Votre matrice n\'est pas cohérente!\n' +
                    '                                </div>\n' +
                    '                            </div>');
            } else {
                alert('Votre matrice est cohérente');
                $(matrixNex).empty();
                arrayColName = [];
                $(elementBtnNextPrevEtap).removeClass('d-none');
                $(elementBtn).addClass('d-none');
                $(etaPres).removeClass('d-none');
                $(etaPres).addClass('d-none');
                $(etaNex).removeClass('d-none');
            }

            $(btnPrevEtap).on('click', function () {
                $(elementBtnNextPrevEtap).removeClass('d-none')
                $(elementBtnNextPrevEtap).addClass('d-none')
                $(elementBtn).removeClass('d-none');
                $(etaNex).removeClass('d-none');
                $(etaNex).addClass('d-none');
                $(etaPres).removeClass('d-none');
                $(matrixNexResult).empty();
                $(ahpMatrix).addClass('d-none');
                matVecteur = [];
                tableLineSommeGlobal = [];
                $('.hideTantQueClickPres').each(function (){
                    let myThis = $(this);
                    myThis.remove();
                })
            })
        }
    })

    $(calcVecteur).on('click', function (){
        let tableValid = [];
        for(let m=0; m < tableCol.length; m++) {
            let testValidMatrix = true;
            for(let k=0; k < arrayColName.length; k++) {
                for(let j=0; j < arrayColName.length; j++) {
                    let element = $('#item-matrix-' + m + '-' + arrayColName[k] + '-' + j);
                    if(element.val() === '') {
                        testValidMatrix = false
                        break;
                    }
                }
            }
            if(!testValidMatrix) {
                tableValid.push(tableCol[m])
            }
        }

        if(tableValid.length > 0) {
            for(let k=0; k < tableValid.length; k++) {
                alert('fill matrix ' + tableValid[k])
            }
        } else {
            $(matrixNexResult).empty();

            matVecteur = new Array(arrayColName.length);

            for(let i=0; i < (arrayColName.length); i++)
            {
                matVecteur[i] = new Array(tableCol.length);
            }

            vecteurGlobal = [];

            for (let m=0 ; m < tableCol.length ; m++) {

                sommeCol=[];
                for(let i=0; i < arrayColName.length; i++) {
                    let somme = 0;
                    for(let j=0; j < arrayColName.length; j++) {
                        let value = Number($('#item-matrix-'+ m +'-'+ arrayColName[i] +'-'+ j).val());
                        somme = value + somme;
                    }
                    sommeCol.push(somme);
                }

                let myArrayMat = new Array(arrayColName.length);
                for(let i=0; i<arrayColName.length; i++)
                {
                    myArrayMat[i]=new Array(arrayColName.length);
                }

                for(let d=0; d < arrayColName.length; d++) {
                    for(let f=0; f < arrayColName.length; f++) {
                        let value = Number($('#item-matrix-'+ m +'-'+ arrayColName[d] +'-'+ f).val());
                        myArrayMat[f][d] = value/sommeCol[d];
                    }
                }

                let tableLineSomme = [];

                for(let h=0; h < arrayColName.length; h++) {
                    let sommeLin = 0;
                    for(let k=0; k < arrayColName.length; k++) {
                        sommeLin = sommeLin + myArrayMat[h][k];
                    }
                    tableLineSomme.push(sommeLin / arrayColName.length);
                }

                for(let i=0; i < tableLineSomme.length; i++) {
                    matVecteur[i][m] = tableLineSomme[i] * tableLineSommeGlobal[m];
                }

                let myArrayMatOne = new Array(arrayColName.length);
                for(let i=0; i < arrayColName.length; i++)
                {
                    myArrayMatOne[i]=new Array(arrayColName.length);
                }

                for(let x=0; x < arrayColName.length; x++) {
                    for(let q=0; q < arrayColName.length; q++) {
                        let value = Number($('#item-matrix-'+ m +'-'+ arrayColName[x] +'-'+ q).val());
                        myArrayMatOne[q][x] = value * tableLineSomme[x];
                    }
                }

                let tableLineSommeTwo = [];

                for(let l=0; l < arrayColName.length; l++) {
                    let sommeLin = 0;
                    for(let w=0; w < arrayColName.length; w++) {
                        sommeLin = sommeLin + myArrayMatOne[l][w];
                    }
                    tableLineSommeTwo.push(sommeLin / tableLineSomme[l]);
                }

                let reducer = (accumulator, curr) => accumulator + curr;

                let moy = tableLineSommeTwo.reduce(reducer) / tableLineSommeTwo.length;

                let newMoy = ((moy - arrayColName.length) / (arrayColName.length - 1)) / RI[arrayColName.length - 1] ;

                let key = m + 1;

                if(newMoy > 0.1) {
                    $(matrixNexResult).append('<div class="col-md-12"><div class="alert alert-danger" role="alert">\n' +
                        'Votre matrice <strong>'+ key +' </strong> n\'est pas cohérente!' +
                        '</div></div>');
                } else {
                    $(matrixNexResult).append('<div class="col-md-12"><div class="alert alert-success" role="alert">\n' +
                        'Votre matrice <strong> '+ key +' </strong> est cohérente' +
                        '</div></div>')
                }

                $(ahpMatrix).removeClass('d-none');

                $('.removeTh').each(function (){
                    $(this).remove();
                })

                let htmlAhpMatrixThead = '';

                for(let j=0; j < tableCol.length; j++) {
                    htmlAhpMatrixThead += '<th class="removeTh text-capitalize hideTantQueClickPres" scope="col">'+ tableCol[j] +'</th>';
                }

                $(ahpMatrixThead).find('#firstCol').after(htmlAhpMatrixThead)

                for(let j=0; j < arrayColName.length; j++) {
                    $(ahpMatrixTbody).append('<tr class="removeTh hideTantQueClickPres text-capitalize tr-'+ arrayColName[j] +'">\n' +
                        '                                        <th scope="row">'+ arrayColName[j] +'</th>\n' +
                        '                                    </tr>')
                }


                // calc

                for (let g=0 ; g < matVecteur.length ; g++) {
                    let html = '',
                        elementPush = $('.tr-'+arrayColName[g]);
                    for (let x = 0; x < tableCol.length; x++) {
                        html += '<td id="hideTantQueClickPres">'+ matVecteur[g][x] +'</td>';
                    }
                    elementPush.find('th').after(html)
                }
            }

            for (let k=0 ; k < matVecteur.length ; k++) {
                let sommeLine = 0;
                for (let x = 0; x < tableCol.length; x++) {
                    sommeLine = sommeLine + matVecteur[k][x];
                }
                vecteurGlobal.push(sommeLine);
            }

            for (let m = 0 ; m < vecteurGlobal.length ; m++) {
                let elementPush = $('.tr-'+ arrayColName[m] +' td:last-child');
                $('#vec-'+m).remove();
                elementPush.after('<td id="hideTantQueClickPres">'+ vecteurGlobal[m] +'</td>')
            }
        }
    })
})