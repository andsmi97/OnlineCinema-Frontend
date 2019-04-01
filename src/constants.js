export const URL = "http://localhost:8080";
export const AUTH_PENDING = "AUTH_PENDING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const SNACK_STATUS_CLOSE = "SNACK_STATUS_CLOSE";
export const SNACK_STATUS_OPEN = "SNACK_STATUS_OPEN";
export const ALERT_STATUS_CLOSE = "ALERT_STATUS_CLOSE";
export const ALERT_STATUS_OPEN = "ALERT_STATUS_OPEN";
export const ALERT_STATUS_ACCEPT = "ALERT_STATUS_ACCEPT";
export const CHANGE_SELECTED_ITEM = "CHANGE_SELECTED_ITEM";
export const ON_CORRECT_RESPONSE = "ON_CORRECT_RESPONSE";
export const ON_WRONG_RESPONSE = "ON_WRONG_RESPONSE";
//TODO: Add column types;
export const FILMSOPTIONS = {
  idfield: ["filmid"],
  request: {
    fields: [
      "filmid",
      "filmname",
      "filmagerestriction",
      "filmreleasedate",
      "filmlength",
      "filmlink",
      "filmprice",
      "filmposterlink",
      "filmdescription",
      "filmbudget",
      "filmviews",
      "films.copyrightownerid as copyrightownerid",
      "filmmonltyviews",
      "copyrightownername"
    ],
    joins: [{ joinTable: "copyrightowners", joinField: "copyrightownerid" }]
  },
  combine: {
    copyrightowner: { id: "copyrightonwerid", name: "copyrightownername" }
  },
  columns: [
    {
      name: "filmname",
      title: "Фильм",
      width: 180,
      columnName: "filmname",
      direction: "asc",
      align: "left"
    },
    {
      name: "filmagerestriction",
      columnName: "filmagerestriction",
      title: "ВО",
      width: 180,
      align: "right"
    },
    {
      name: "filmreleasedate",
      columnName: "filmreleasedate",
      title: "Дата",
      width: 180,
      align: "center"
    },
    {
      name: "filmlength",
      columnName: "filmlength",
      title: "Длительность",
      width: 180,
      align: "right"
    },
    {
      name: "filmlink",
      columnName: "filmlink",
      title: "Ссылка",
      width: 180,
      align: "left"
    },
    {
      name: "filmprice",
      columnName: "filmprice",
      title: "Стоимость",
      width: 180,
      align: "right"
    },
    {
      name: "filmposterlink",
      columnName: "filmposterlink",
      title: "Постер",
      width: 180,
      align: "left"
    },
    {
      name: "filmdescription",
      columnName: "filmdescription",
      title: "Описание",
      width: 180,
      align: "left"
    },
    {
      name: "filmbudget",
      columnName: "filmbudget",
      title: "Бюджет",
      width: 180,
      align: "right"
    },
    {
      name: "filmviews",
      columnName: "filmviews",
      title: "Всего просмотров",
      width: 180,
      align: "left"
    },
    {
      name: "copyrightownerid",
      columnName: "copyrightownerid",
      title: "Правообладатель",
      width: 180,
      align: "left"
      // getCellValue: row =>
      //   row.copyrightownername ? row.copyrightownername : "Нет",
      // createRowChange: (row, value) => ({
      //   copyrightowner: { id: value.id, name: value.name },
      //   copyrightonwerid: value.id,
      //   copyrightownername: value.name
      // })
    },
    {
      name: "filmmonltyviews",
      columnName: "filmmonltyviews",
      title: "Просмотров в месяц",
      width: 180,
      align: "right"
    }
  ]
};

export const PEOPLEOPTIONS = {
  idfield: ["personid"],
  request: {
    fields: [
      "cityid",
      "personname",
      "personbirthday",
      "personavatar",
      "personfacts"
    ]
  },
  columns: [
    {
      name: "cityid",
      columnName: "cityid",
      title: "Место рождения",
      width: 180,
      align: "right"
    },
    {
      name: "personname",
      columnName: "personname",
      direction: "asc",
      title: "ФИО",
      width: 180,
      align: "left"
    },
    {
      name: "personbirthday",
      columnName: "personbirthday",
      title: "День рождения",
      width: 180,
      align: "center"
    },
    {
      name: "personavatar",
      columnName: "personavatar",
      title: "Аватар",
      width: 180,
      align: "left"
    },
    {
      name: "personfacts",
      columnName: "personfacts",
      title: "Факты",
      width: 180,
      align: "left"
    }
  ]
};

export const USERSOPTIONS = {
  idfield: ["userid"],
  request: {
    fields: [
      "userid",
      "username",
      "useremail",
      "userstatus",
      "userstatusduedate",
      "userspent",
      "usermoney"
    ]
  },
  columns: [
    {
      name: "username",
      columnName: "username",
      title: "ФИО",
      width: 180,
      align: "left",
      direction: "asc"
    },
    {
      name: "useremail",
      columnName: "useremail",
      title: "Email",
      width: 180,
      align: "left"
    },
    {
      name: "userstatus",
      columnName: "userstatus",
      title: "Статус",
      width: 180,
      align: "left"
    },

    {
      name: "userstatusduedate",
      columnName: "userstatusduedate",
      title: "Истекает",
      width: 180,
      align: "center"
    },
    {
      name: "userspent",
      columnName: "userspent",
      title: "Потратил всего",
      width: 180,
      align: "right"
    },
    {
      name: "usermoney",
      columnName: "usermoney",
      title: "Кошелек",
      width: 180,
      align: "right"
    }
  ]
};

export const AWARDSOPTIONS = filmid => ({
  idfield: ["awardid"],
  request: {
    fields: [
      // "awardid",
      "awardname",
      "awardcategory",
      "awardyear",
      // "filmid",
      // "personid",
      "personname"
    ],
    joins: [
      {
        joinTable: "people",
        joinField: "personid"
      }
    ],
    filter: { filmid }
  },
  columns: [
    {
      name: "awardname",
      columnName: "awardname",
      title: "Название",
      width: 180,
      align: "left",
      direction: "asc"
    },
    {
      name: "awardcategory",
      columnName: "awardcategory",
      title: "Категория",
      width: 180,
      align: "left"
    },
    {
      name: "awardyear",
      columnName: "awardyear",
      title: "Год",
      width: 180,
      align: "right"
    },

    // {
    //   name: "filmid",
    //   columnName: "filmid",
    //   title: "Фильм",
    //   width: 180,
    //   align: "right"
    // },
    {
      name: "personname",
      columnName: "personname",
      title: "Награжденный",
      width: 180,
      align: "right"
    }
  ]
});

export const CITIESOPTIONS = {
  idfield: ["cityid"],
  request: {
    fields: ["cityid", "cityname", "countryid"]
  },
  columns: [
    {
      name: "countryid",
      columnName: "countryid",
      title: "Страна",
      width: 180,
      align: "left",
      direction: "asc"
    },
    {
      name: "cityname",
      columnName: "cityname",
      title: "Город",
      width: 180,
      align: "left"
    }
  ]
};

export const COUNTRIESOPTIONS = {
  idfield: ["countryid"],
  request: {
    fields: ["countryid", "countryname"]
  },
  columns: [
    {
      name: "countryname",
      columnName: "countryname",
      title: "Страна",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
};

export const GENRESOPTIONS = {
  idfield: ["genreid"],
  request: {
    fields: ["genreid", "genrename"]
  },
  columns: [
    {
      name: "genrename",
      columnName: "genrename",
      title: "Жанр",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
};

export const ACTORSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname", "role"],
    joins: [
      {
        joinTable: "people",
        joinField: "personid"
      }
    ],

    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя актера",
      width: 180,
      align: "left",
      direction: "asc"
    },
    {
      name: "role",
      columnName: "role",
      title: "Роль",
      width: 180,
      align: "left"
    }
  ]
});

export const DIRECTORSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname"],
    joins: [
      {
        joinTable: "people",
        joinField: "personid"
      }
    ],
    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя Режисера",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const SCRIPTWRITERSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname"],
    joins: [{ joinTable: "people", joinField: "personid" }],
    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя Сценариста",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const PRODUCERSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname"],
    joins: [
      {
        joinTable: "people",
        joinField: "personid"
      }
    ],

    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя Продюсера",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const COMPOSERSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname"],
    joins: [{ joinTable: "people", joinField: "personid" }],
    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя Композитора",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const DESIGNERSOPTIONS = filmid => ({
  idfield: ["filmid", "personid"],
  request: {
    fields: ["filmid", "people.personid", "personname"],
    joins: [{ joinTable: "people", joinField: "personid" }],
    filter: { filmid }
  },
  columns: [
    {
      name: "personname",
      columnName: "personname",
      title: "Имя Художника",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const FILMSGENRESOPTIONS = filmid => ({
  idfield: ["filmid", "genreid"],
  request: {
    fields: ["filmid", "genres.genreid", "genrename"],
    joins: [
      {
        joinTable: "genres",
        joinField: "genreid"
      }
    ],
    filter: { filmid }
  },
  columns: [
    {
      name: "genrename",
      columnName: "genrename",
      title: "Жанр",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});
export const FILMSCOUNTRIESOPTIONS = filmid => ({
  idfield: ["filmid", "countryid"],
  request: {
    fields: ["filmid", "countries.countryid", "countryname"],
    joins: [
      {
        joinTable: "countries",
        joinField: "countryid"
      }
    ],

    filter: { filmid }
  },
  columns: [
    {
      name: "countryname",
      columnName: "countryname",
      title: "Страна",
      width: 180,
      align: "left",
      direction: "asc"
    }
  ]
});

export const SETTLEMENTSOPTIONS = {
  idfield: ["personid"],
  request: {
    fields: ["settlementid", "settlementdate"]
  },
  columns: [
    {
      name: "settlementid",
      columnName: "settlementid",
      title: "Номер платежа",
      width: 180,
      align: "right"
    },
    {
      name: "settlementdate",
      columnName: "settlementdate",

      title: "Дата платежа",
      width: 180,
      align: "right"
    }
  ]
};

export const SETTLEMENTSCOPYRIGHTOPTIONS = settlementid => ({
  idfield: ["settlementid", "copyrightownerid"],
  request: {
    fields: [
      "settlementid",
      "settlementscopyrightowners.copyrightownerid",
      "copyrightownername",
      "amount"
    ],
    joins: [
      {
        joinTable: "copyrightowners",
        joinField: "copyrightownerid"
      }
    ],

    filter: { settlementid }
  },
  columns: [
    {
      name: "copyrightownername",
      columnName: "copyrightownername",
      title: "Правообладатель",
      width: 180,
      align: "left",
      direction: "asc"
    },
    {
      name: "amount",
      columnName: "amount",
      title: "Платеж",
      width: 180,
      align: "right"
    }
  ]
});
